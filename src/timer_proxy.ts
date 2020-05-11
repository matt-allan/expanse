import { BrowserWindow, ipcMain, ipcRenderer, IpcRendererEvent } from 'electron';
import { Timer, Status } from './timer';

export interface TimerState {
  status: Status,
  seconds: number,
  remaining: number, 
}

export interface TimerProxyInterface {
  state(): Promise<TimerState>;
  on(channel: string, callback: (state: TimerState) => void): void;
  removeAllListeners(channel: string): void;
  start(): void;
  stop(): void;
  restart(): void;
}

export const timerProxy = {
  state: async (): Promise<TimerState> => {
    return ipcRenderer.invoke('timer:state');
  },
  on: (channel: string, callback: (state: TimerState) => {}) => {
    // todo: keep a map of callback => listener callback so we can remove subscriptions
    ipcRenderer.on(`timer:on:${channel}`, (event: IpcRendererEvent, state: TimerState) => {
      callback(state);
    });
  },
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
  start: () => {
    ipcRenderer.send('timer:start');
  },
  stop: () => {
    ipcRenderer.send('timer:stop');
  },
  restart: () => {
    ipcRenderer.send('timer:restart');
  },
};

const getState = (timer: Timer): TimerState => ({
  status: timer.status,
  seconds: timer.seconds,
  remaining: timer.remaining,
});

export const connectTimerProxy = (timer: Timer, window: BrowserWindow | null) => {
  ipcMain.handle('timer:state', async (): Promise<TimerState> => getState(timer));
  ipcMain.on('timer:start', () => timer.start());
  ipcMain.on('timer:stop', () => timer.stop());
  ipcMain.on('timer:restart', () => timer.restart());

  const send = (channel: string) => {
    if (window) {
      window.webContents.send(channel, getState(timer));
    }
  };

  timer.on('started', () => send('timer:on:started'));
  timer.on('stopped', () => send('timer:on:stopped'));
  timer.on('restarted', () => send('timer:on:restarted'));
  timer.on('end', () => send('timer:on:end'));
}