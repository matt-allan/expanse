import { EventEmitter } from 'events';

export class Timer extends EventEmitter {
  seconds: number;

  remaining: number;

  timer?: NodeJS.Timeout;

  constructor(minutes: number, seconds?: number) {
    super();

    this.seconds = (minutes * 60) + (seconds || 0);

    this.remaining = this.seconds;
  }

  start = (): void => {
    this.startTimer();

    this.emit('started');
  }

  stop = (): void => {
    this.stopTimer();

    this.emit('stopped');
  }

  restart = (): void => {
    this.stopTimer();
    this.remaining = this.seconds;
    this.startTimer();

    this.emit('restarted');
  }

  running = (): boolean => !!this.timer;

  startTimer = (): void => {
    this.timer = setInterval(() => {
      this.emit('tick', this.remaining);
      if (--this.remaining < 0) {
        this.stop();
      }
    }, 1000);
  }

  stopTimer = (): void => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = undefined;
  }
}