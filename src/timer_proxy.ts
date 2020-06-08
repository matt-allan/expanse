import { ipcMain, ipcRenderer, IpcRendererEvent } from "electron";

import { Timer } from "./timer";
import { events, Status } from "./timer_types";
import { mainWindow } from "./window";

export interface TimerState {
  status: Status;
  seconds: number;
  remaining: number;
}

enum Channel {
  State = "state",
  Start = "start",
  Stop = "stop",
  Restart = "restart",
  On = "on",
}

const prefixChannel = (channel: Channel) => `timer:${channel}`;

const prefixEvent = (event: string) => `${prefixChannel(Channel.On)}:${event}`;

export interface TimerProxy {
  state(): Promise<TimerState>;
  on(channel: string, callback: (state: TimerState) => void): void;
  removeAllListeners(channel: string): void;
  start(): void;
  stop(): void;
  restart(): void;
}

export const timer = {
  state: async (): Promise<TimerState> => {
    return ipcRenderer.invoke(prefixChannel(Channel.State));
  },
  on: (event: string, callback: (state: TimerState) => void): void => {
    ipcRenderer.on(
      prefixEvent(event),
      (event: IpcRendererEvent, state: TimerState) => {
        callback(state);
      }
    );
  },
  removeAllListeners: (event: string): void => {
    ipcRenderer.removeAllListeners(event);
  },
  start: (): void => {
    ipcRenderer.send(prefixChannel(Channel.Start));
  },
  stop: (): void => {
    ipcRenderer.send(prefixChannel(Channel.Stop));
  },
  restart: (): void => {
    ipcRenderer.send(prefixChannel(Channel.Restart));
  },
};

const getState = (timer: Timer): TimerState => ({
  status: timer.status,
  seconds: timer.seconds,
  remaining: timer.remaining,
});

export const connectTimerProxy = (timer: Timer): void => {
  ipcMain.handle(
    prefixChannel(Channel.State),
    async (): Promise<TimerState> => getState(timer)
  );
  ipcMain.on(prefixChannel(Channel.Start), () => timer.start());
  ipcMain.on(prefixChannel(Channel.Stop), () => timer.stop());
  ipcMain.on(prefixChannel(Channel.Restart), () => timer.restart());

  const send = (channel: string) => {
    if (mainWindow) {
      mainWindow.webContents.send(channel, getState(timer));
    }
  };

  for (const event of events) {
    timer.on(event, () => send(prefixEvent(event)));
  }
};
