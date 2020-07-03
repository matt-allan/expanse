import { app } from "electron";

import { createTray } from "./tray";
import { createWindow } from "./window";
import { Timer } from "./timer";
import { connectNotification } from "./notification";
import { connectTimerProxy } from "./timer_proxy";
import { connectBrowserWindowProxy } from "./window_proxy";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const timer = new Timer(25);

app.on("ready", () => {
  createWindow();
  connectTimerProxy(timer);
  connectBrowserWindowProxy();
  connectNotification(timer);
  createTray(timer);
});

app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  createWindow();
});
