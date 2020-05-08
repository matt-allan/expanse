import { app, ipcMain } from 'electron';
import { createTray } from './tray';
import { createWindow } from './window';
import { Timer } from './timer';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const timer = new Timer(25);

timer.on('tick', (seconds: number) => console.log(seconds));

ipcMain.on('timer:start', (event) => {
  timer.start();
});

ipcMain.on('timer:pause', (event) => {
  timer.pause();
});

ipcMain.on('timer:resume', (event) => {
  timer.resume();
});

ipcMain.on('timer:restart', (event) => {
  timer.restart();
});

app.on('ready', () => {
  let window = createWindow();

  // todo: clean this up
  timer.on('paused', () => {
    console.log('timer paused in main...');
    window.webContents.send('timer:paused');
  });

  createTray();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  createWindow();
});
