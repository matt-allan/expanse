import { app, Menu, Tray } from 'electron';
import { createWindow } from './window';
import { Timer } from './timer';

// Keep a global reference of the tray object, if you don't, the tray will
// be removed automatically when the JavaScript object is garbage collected.
let tray: Tray | null;

const trayImage = (timer: Timer) => {
  const eighths = Math.round((timer.remaining / timer.seconds) * 8);

  return `./resources/img/menubar/${eighths}-8/menubar-iconTemplate.png`;
}

export const createTray = (timer: Timer) => {
  tray = new Tray(trayImage(timer));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click: async () => {
        createWindow();
      }
    },
    {
      label: 'Quit',
      role: 'quit'
    },
  ]);

  tray.setContextMenu(contextMenu);

  timer.on('tick', () => {
    // todo (optimization): only set when it actually changes
    tray!.setImage(trayImage(timer));
  });
}