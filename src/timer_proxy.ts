import { BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import { Timer } from './timer';

export interface TimerProxyInterface {
  running(): Promise<boolean>;
  seconds(): Promise<{seconds: number, remaining: number}>;
  on(event: string, callback: (event: string) => void): void;
  start(): void;
  stop(): void;
  restart(): void;
}

export const timerProxy = {
  seconds: async () => {
    return ipcRenderer.invoke('timer:seconds');
  },
  running: async () => {
    return ipcRenderer.invoke('timer:running');
  },
  on: (event: string, callback: (event: string) => {}) => {
    ipcRenderer.on(`timer:${event}`, () => {
      callback(event);
    });
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

export const connectTimerProxy = (timer: Timer, window: BrowserWindow | null) => {
  ipcMain.handle('timer:seconds', async () => {
    return {
      seconds: timer.seconds,
      remaining: timer.remaining,
    }
  });
  ipcMain.handle('timer:running', async () => timer.running());

  ipcMain.on('timer:start', () => timer.start());
  ipcMain.on('timer:stop', () => timer.stop());
  ipcMain.on('timer:restart', () => timer.restart());

  const send = (event: string) => {
    if (window) {
      window.webContents.send(event);
    }
  };

  timer.on('started', () => send('timer:started'));
  timer.on('stopped', () => send('timer:stopped'));
  timer.on('restarted', () => send('timer:restarted'));
}