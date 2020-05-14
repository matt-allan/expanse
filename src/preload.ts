import { contextBridge } from 'electron';

import { timer, TimerProxy } from './timer_proxy';
import { browserWindow, BrowserWindowProxy } from './window_proxy';

declare global {
  interface Window {
    expanse: {
      timer: TimerProxy,
      browserWindow: BrowserWindowProxy,
    }
  }
}

contextBridge.exposeInMainWorld(
  'expanse',
  {
    timer: timer,
    browserWindow: browserWindow,
  }
);
