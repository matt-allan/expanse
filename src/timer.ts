import { EventEmitter } from "events";
import { Event, Status } from "./timer_types";

export { Event, Status };

export class Timer extends EventEmitter {
  seconds: number;

  remaining: number;

  timer?: NodeJS.Timeout;

  status: Status;

  constructor(minutes: number, seconds?: number) {
    super();

    this.seconds = minutes * 60 + (seconds || 0);

    this.remaining = this.seconds;

    this.status = Status.Stopped;
  }

  start = (): void => {
    if (this.status == Status.Started) {
      console.error("Cannot start a started timer");
      return;
    }

    this.startTimer();

    this.status = Status.Started;

    this.emit(Event.Started);
  };

  stop = (): void => {
    if (this.status != Status.Started) {
      console.error("Cannot stop a not started timer");
      return;
    }

    this.stopTimer();

    this.status = Status.Stopped;

    this.emit(Event.Stopped);
  };

  restart = (): void => {
    if (this.status == Status.Started) {
      this.stop();
    }

    this.remaining = this.seconds;

    this.start();

    this.emit(Event.Restarted);
  };

  end = (): void => {
    this.stopTimer();

    this.status = Status.Ended;

    this.emit(Event.Ended);
  };

  startTimer = (): void => {
    this.timer = setInterval(() => {
      this.emit(Event.Tick, --this.remaining);
      if (this.remaining == 0) {
        this.end();
      }
    }, 1000);
  };

  stopTimer = (): void => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = undefined;
  };
}
