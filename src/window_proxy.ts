import { BrowserWindow, ipcMain, ipcRenderer, IpcMainInvokeEvent } from 'electron';

import { mainWindow } from './window';

export interface BrowserWindowProxy {
  setFullscreen(flag: boolean): void
}

export const browserWindow = {
  setFullscreen: (flag: boolean): void => {
    ipcRenderer.invoke('browserWindow:setFullscreen', flag);
  },
};

export const connectBrowserWindowProxy = () => {
  ipcMain.handle('browserWindow:setFullscreen', (event: IpcMainInvokeEvent, flag: boolean): void => {
    if (mainWindow) {
      mainWindow.setFullScreen(flag);
    }
  });
};
