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

// debug
timer.on('tick', (seconds: number) => console.log(seconds));

app.on('ready', () => {
  window = createWindow();
  connectTimerProxy(timer, window);

  createTray(timer);
});

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  window = createWindow();
});
