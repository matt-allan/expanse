import { BrowserWindow, ipcMain, ipcRenderer, IpcRendererEvent } from 'electron';
import { Timer } from './timer';
import { mainWindow } from './window';

export interface TimerState {
  status: 'started' | 'stopped' | 'ended',
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

export const connectTimerProxy = (timer: Timer) => {
  ipcMain.handle('timer:state', async (): Promise<TimerState> => getState(timer));
  ipcMain.on('timer:start', () => timer.start());
  ipcMain.on('timer:stop', () => timer.stop());
  ipcMain.on('timer:restart', () => timer.restart());

  const send = (channel: string) => {
    if (mainWindow) {
      mainWindow.webContents.send(channel, getState(timer));
    }
  };

  timer.on('started', () => send('timer:on:started'));
  timer.on('stopped', () => send('timer:on:stopped'));
  timer.on('end', () => send('timer:on:end'));
  timer.on('restart', () => send('timer:on:restart'));
}