import { Notification } from "electron";

import { Event, Timer } from "./timer";
import { mainWindow, showWindow } from "./window";

const startBreak = () => showWindow();
const skipBreak = (timer: Timer) => timer.restart();

const breakNotification = (timer: Timer): Notification => {
  const notification = new Notification({
    title: "It's time to take a break!",
    body: "Go ahead and relax for a few minutes.",
    actions: [
      {
        type: "button",
        text: "Start break",
      },
      {
        type: "button",
        text: "Skip break",
      },
    ],
  });

  notification.on("click", startBreak);

  notification.on("action", (event: Electron.Event, index: number) => {
    if (index === 0) {
      startBreak();
    } else {
      skipBreak(timer);
    }
  });

  return notification;
};

export const connectNotification = (timer: Timer): void => {
  timer.on(Event.Ended, () => {
    if (mainWindow && mainWindow.isVisible()) {
      return;
    }

    breakNotification(timer).show();
  });
};
