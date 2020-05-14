import { BrowserWindow, ipcMain, ipcRenderer, IpcMainInvokeEvent } from 'electron';

import { mainWindow } from './window';

enum Channel {
  SetFullScreen = 'setFullScreen',
}

export interface BrowserWindowProxy {
  setFullScreen(flag: boolean): void
}

const prefixChannel = (channel: Channel) => `browserWindow:${channel}`;

export const browserWindow = {
  setFullScreen: (flag: boolean): void => {
    ipcRenderer.invoke(prefixChannel(Channel.SetFullScreen), flag);
  },
};

export const connectBrowserWindowProxy = () => {
  ipcMain.handle(prefixChannel(Channel.SetFullScreen), (event: IpcMainInvokeEvent, flag: boolean): void => {
    if (mainWindow) {
      mainWindow.setFullScreen(flag);
    }
  });
};
