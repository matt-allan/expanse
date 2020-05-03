import { app, BrowserWindow } from 'electron';

declare var MAIN_WINDOW_WEBPACK_ENTRY: string;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

export const createWindow = () => {
  if (mainWindow) {
    return;
  }

  mainWindow = new BrowserWindow({
    titleBarStyle: 'hidden',
    width: 600,
    height: 640,
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

export const register = () => {
  app.on('ready', () => {
    createWindow();
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    createWindow();
  });
}

