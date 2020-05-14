import { contextBridge } from 'electron';
import { timerProxy } from './timer_proxy';
import { browserWindowProxy } from './window_proxy';

contextBridge.exposeInMainWorld(
  'expanse',
  {
    timer: timerProxy,
    browserWindow: browserWindowProxy,
  }
)
