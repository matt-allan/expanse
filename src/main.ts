import { app } from 'electron';
import { createTray } from './tray';
import { createWindow } from './window';
import { Timer } from './timer';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const timer = new Timer(25);
// todo: wire timer to tray and React component state

app.on('ready', () => {
  createWindow();
  createTray();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  createWindow();
});
