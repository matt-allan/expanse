import { BrowserWindow } from "electron";

declare let MAIN_WINDOW_WEBPACK_ENTRY: string;
declare let MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: BrowserWindow | null;

export { mainWindow };

export const createWindow = (): BrowserWindow => {
  if (mainWindow) {
    return mainWindow;
  }

  mainWindow = new BrowserWindow({
    titleBarStyle: "hidden",
    width: 600,
    height: 640,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      allowRunningInsecureContent: false,
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  return mainWindow;
};

export const showWindow = (): void => {
  createWindow();
  if (!mainWindow) {
    console.error("could not create window");
    return;
  }

  if (!mainWindow.isVisible()) {
    mainWindow.show();
  }
};
