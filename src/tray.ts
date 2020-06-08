import { Menu, Tray } from "electron";
import path from "path";

import { createWindow } from "./window";
import { Event, Status, Timer } from "./timer";

// Keep a global reference of the tray object, if you don't, the tray will
// be removed automatically when the JavaScript object is garbage collected.
let tray: Tray | null;

const calcEighths = (timer: Timer): number => {
  const eighths = Math.round((timer.remaining / timer.seconds) * 8);

  return eighths > 0 ? eighths : 8;
};

const trayImage = (eighths: number): string =>
  path.resolve(
    __dirname,
    `./resources/img/menubar/${eighths}-8/menubar-iconTemplate.png`
  );

const contextMenu = (timer: Timer): Menu => {
  return Menu.buildFromTemplate([
    {
      label: "Open",
      click: async () => {
        createWindow();
      },
    },
    {
      label: "Start",
      id: "start",
      click: async () => timer.start(),
      visible: timer.status != Status.Started,
    },
    {
      label: "Stop",
      id: "stop",
      click: async () => timer.stop(),
      visible: timer.status == Status.Started,
    },
    {
      label: "Restart",
      click: async () => timer.restart(),
    },
    {
      label: "Quit",
      role: "quit",
    },
  ]);
};

export const createTray = (timer: Timer): void => {
  let eighths = calcEighths(timer);

  tray = new Tray(trayImage(eighths));

  const menu = contextMenu(timer);

  tray.setContextMenu(menu);

  const updateTrayImage = () => {
    const lastEighths = eighths;

    eighths = calcEighths(timer);

    if (eighths !== lastEighths && tray) {
      tray.setImage(trayImage(eighths));
    }
  };

  timer.on(Event.Tick, updateTrayImage);
  timer.on(Event.Restarted, updateTrayImage);

  timer.on(Event.Started, () => {
    menu.getMenuItemById("start").visible = false;
    menu.getMenuItemById("stop").visible = true;
  });

  timer.on(Event.Stopped, () => {
    menu.getMenuItemById("start").visible = true;
    menu.getMenuItemById("stop").visible = false;
  });

  timer.on(Event.Restarted, () => {
    menu.getMenuItemById("start").visible = false;
    menu.getMenuItemById("stop").visible = true;
  });
};
