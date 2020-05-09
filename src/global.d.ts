import { TimerProxyInterface } from './timer_proxy';

declare global {
  interface Window {
    expanse: {
      timer: TimerProxyInterface
    }
  }
}
