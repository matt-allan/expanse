import { app } from "electron";
import { createTray } from "./tray";
import { createWindow, connectWindow } from "./window";
import { Event, Timer } from "./timer";
import { connectTimerProxy } from "./timer_proxy";
import { connectBrowserWindowProxy } from "./window_proxy";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const timer = new Timer(0, 10);

// debug
timer.on(Event.Tick, (seconds: number) => console.log(seconds));

app.on("ready", () => {
  createWindow();
  connectWindow(timer);
  connectTimerProxy(timer);
  connectBrowserWindowProxy();

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
