import { EventEmitter } from 'events';

export class Timer extends EventEmitter {
  seconds: number;

  secondsLeft: number;

  timer?: NodeJS.Timeout;

  constructor(minutes: number, seconds?: number) {
    super();

    this.seconds = (minutes * 60) + (seconds || 0);

    this.secondsLeft = this.seconds;
  }

  start = (): void => {
    this.startTimer();

    this.emit('started');
  }

  pause(): void {
    this.stopTimer();

    this.emit('paused');
  }

  resume(): void {
    this.startTimer();

    this.emit('resumed');
  }

  stop = (): void => {
    this.stopTimer();
    this.secondsLeft = this.seconds;

    this.emit('stopped');
  }

  restart = (): void => {
    this.stopTimer();
    this.secondsLeft = this.seconds;
    this.startTimer();

    this.emit('restarted');
  }

  startTimer = (): void => {
    this.timer = setInterval(() => {
      this.emit('tick', this.secondsLeft);
      if (--this.secondsLeft < 0) {
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