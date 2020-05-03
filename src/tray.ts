import { app, Menu, Tray } from 'electron';
import { createWindow } from './window';

// Keep a global reference of the tray object, if you don't, the tray will
// be removed automatically when the JavaScript object is garbage collected.
let tray: Tray | null;

const createTray = () => {
  tray = new Tray('./resources/img/menubar/8-8/menubar-iconTemplate.png');

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: async () => {
        // todo: decouple with ipc?
        createWindow();
      }
    },
    {
      label: 'Quit',
      role: 'quit'
    },
  ]);

  tray.setContextMenu(contextMenu);
}

export const register = () => {
  app.on('ready', () => {
    createTray();
  });
}

