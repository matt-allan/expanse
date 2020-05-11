import { EventEmitter } from 'events';

export enum Status {
 Started = 'started',
 Stopped = 'stopped',
 Ended = 'ended',
}

export class Timer extends EventEmitter {
  seconds: number;

  remaining: number;

  timer?: NodeJS.Timeout;

  status: Status;

  constructor(minutes: number, seconds?: number) {
    super();

    this.seconds = (minutes * 60) + (seconds || 0);

    this.remaining = this.seconds;

    this.status = Status.Stopped;
  }

  start = (): void => {
    if (this.status == Status.Started) {
      console.error('Cannot start a started timer');
      return;
    }

    this.startTimer();

    this.status = Status.Started;

    this.emit('started');
  }

  stop = (): void => {
    if (this.status != Status.Started) {
      console.error('Cannot stop a not started timer');
      return;
    }

    this.stopTimer();

    this.status = Status.Stopped;

    this.emit('stopped');
  }

  reset = (): void => {    
    this.stopTimer();

    this.remaining = this.seconds;
    
    if (this.status == Status.Started) {
      this.startTimer();
    }

    this.emit('reset');
  }

  end = (): void => {
    this.stopTimer();

    this.status = Status.Ended;

    this.emit('end');
  }

  startTimer = (): void => {
    this.timer = setInterval(() => {
      this.emit('tick', --this.remaining);
      if (this.remaining == 0) {
        this.end();
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