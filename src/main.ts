import { app, BrowserWindow, ipcMain } from 'electron';
import { createTray } from './tray';
import { createWindow } from './window';
import { Timer } from './timer';
import { connectTimerProxy } from './timer_proxy';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let window: BrowserWindow | null = null;

const timer = new Timer(25);

connectTimerProxy(timer, window);

// debug
timer.on('tick', (seconds: number) => console.log(seconds));

app.on('ready', () => {
  window = createWindow();

  createTray();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  window = createWindow();
});
