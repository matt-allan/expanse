import { BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import { Timer } from './timer';

export interface TimerProxyInterface {
  on: (event: string, callback: (event: string) => {}) => {};
  start: () => {};
  pause: () => {};
  resume: () => {},
  stop: () => {},
  restart: () => {},
}

export const timerProxy = {
  on: (event: string, callback: (event: string) => {}) => {
    ipcRenderer.on(`timer:${event}`, () => {
      callback(event);
    });
  },
  start: () => {
    ipcRenderer.send('timer:start');
  },
  pause: () => {
    ipcRenderer.send('timer:pause');
  },
  resume: () => {
    ipcRenderer.send('timer:resume');
  },
  stop: () => {
    ipcRenderer.send('timer:stop');
  },
  restart: () => {
    ipcRenderer.send('timer:restart');
  },
};

export const connectTimerProxy = (timer: Timer, window: BrowserWindow | null) => {
  ipcMain.on('timer:start', () => timer.start());
  ipcMain.on('timer:pause', () => timer.pause());
  ipcMain.on('timer:resume', () => timer.resume());
  ipcMain.on('timer:stop', () => timer.stop());
  ipcMain.on('timer:restart', () => timer.restart());

  const send = (event: string) => {
    if (window) {
      window.webContents.send('timer:paused')
    }
  };

  timer.on('started', () => send('timer:started'));
  timer.on('paused', () => send('timer:paused'));
  timer.on('resumed', () => send('timer:resumed'));
  timer.on('stopped', () => send('timer:stopped'));
  timer.on('restarted', () => send('timer:restarted'));
}