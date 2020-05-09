import { contextBridge } from 'electron';
import { timerProxy } from './timer_proxy';

contextBridge.exposeInMainWorld(
  'expanse',
  {
    timer: timerProxy
  }
)
