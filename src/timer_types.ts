export enum Status {
  Started = "started",
  Stopped = "stopped",
  Ended = "ended",
}

export const statuses = Object.values(Status);

export enum Event {
  Started = "started",
  Stopped = "stopped",
  Restarted = "restarted",
  Ended = "ended",
  Tick = "tick",
}

export const events = Object.values(Event);
