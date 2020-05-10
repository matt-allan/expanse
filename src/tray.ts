import { app, Menu, Tray } from 'electron';
import { createWindow } from './window';
import { Timer } from './timer';

// Keep a global reference of the tray object, if you don't, the tray will
// be removed automatically when the JavaScript object is garbage collected.
let tray: Tray | null;

const trayImage = (timer: Timer) => {
  const eighths = Math.round((timer.remaining / timer.seconds) * 8);

  return `./resources/img/menubar/${eighths}-8/menubar-iconTemplate.png`;
};

const contextMenu = (timer: Timer): Menu => {
  return Menu.buildFromTemplate([
    {
      label: 'Open',
      click: async () => {
        createWindow();
      }
    },
    {
      label: 'Start',
      id: 'start',
      click: async () => timer.start(),
      visible: !timer.running(),
    },
    {
      label: 'Stop',
      id: 'stop',
      click: async () => timer.stop(),
      visible: timer.running(),
    },
    {
      label: 'Restart',
      click: async () => timer.restart()
    },
    {
      label: 'Quit',
      role: 'quit'
    },
  ]);
};

export const createTray = (timer: Timer) => {
  tray = new Tray(trayImage(timer));

  const menu = contextMenu(timer);

  tray.setContextMenu(menu);

  timer.on('tick', () => {
    // todo (optimization): only set when it actually changes
    tray!.setImage(trayImage(timer));
  });

  timer.on('started', () => {
    menu.getMenuItemById('start').visible = false;
    menu.getMenuItemById('stop').visible = true;
  });

  timer.on('stopped', () => {
    menu.getMenuItemById('start').visible = true;
    menu.getMenuItemById('stop').visible = false;
  });

  timer.on('restarted', () => {
    menu.getMenuItemById('start').visible = false;
    menu.getMenuItemById('stop').visible = true;
  });
};