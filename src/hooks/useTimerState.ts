import { useEffect, useState } from "react";

import { TimerState } from "./../timer_proxy";
import { events, Status } from "./../timer_types";

const timerProxy = window.expanse.timer;

export const useTimerState = (): TimerState => {
  const [timerState, setTimerState] = useState<TimerState>({
    seconds: 0,
    remaining: 0,
    status: Status.Stopped,
  });

  useEffect(() => {
    timerProxy.state().then((state: TimerState) => {
      setTimerState(state);
    });

    for (const event of events) {
      timerProxy.on(event, setTimerState);
    }

    return () => {
      for (const event of events) {
        timerProxy.removeAllListeners(event);
      }
    };
  }, []);

  return timerState;
};
