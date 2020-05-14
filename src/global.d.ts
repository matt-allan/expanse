import { TimerProxyInterface } from './timer_proxy';
import { BrowserWindowProxyInterface } from './window_proxy';

declare global {
  interface Window {
    expanse: {
      timer: TimerProxyInterface,
      browserWindow: BrowserWindowProxyInterface,
    }
  }
}
