import { app } from 'electron';
import { register as registerTray } from './tray';
import { register as registerWindow } from './window';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

registerWindow();
registerTray();