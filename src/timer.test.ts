import { Timer, Status, Event } from "./timer";

jest.useFakeTimers();

describe("timer", () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer(10);
  });

  test("create", () => {
    expect(timer.remaining).toEqual(10 * 60);

    expect(timer.status).toEqual(Status.Stopped);
  });

  test("start", () => {
    const remaining = timer.remaining;

    timer.start();

    expect(timer.status).toEqual(Status.Started);

    jest.advanceTimersByTime(1000);

    expect(timer.status).toEqual(Status.Started);

    expect(timer.remaining).toEqual(remaining - 1);

    jest.runAllTimers();

    expect(timer.remaining).toEqual(0);

    expect(timer.status).toEqual(Status.Ended);
  });

  test("stop", () => {
    timer.start();

    const remaining = timer.remaining;

    timer.stop();

    jest.runAllTimers();

    expect(timer.status).toEqual(Status.Stopped);

    expect(timer.remaining).toEqual(remaining);
  });

  test("restart", () => {
    const remaining = timer.remaining;

    timer.start();

    jest.runAllTimers();

    timer.restart();

    expect(timer.status).toEqual(Status.Started);

    expect(timer.remaining).toEqual(remaining);
  });

  test("seek", () => {
    timer.seek(100);

    expect(timer.status).toEqual(Status.Started);

    expect(timer.remaining).toEqual(100);
  });

  test("on", () => {
    const onStart = jest.fn();

    timer.on(Event.Started, onStart);

    timer.start();

    expect(onStart.mock.calls.length).toEqual(1);
  });
});
