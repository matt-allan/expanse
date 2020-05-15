import React, { useEffect, useState } from "react";
import { Grommet } from 'grommet';

import { theme } from './../theme';
import { TimerState } from './../timer_proxy';
import { events, Event, statuses, Status } from './../timer_types';
import { Break } from './Break';
import { Timer } from './Timer';

const timerProxy = window.expanse.timer;

export const App = () => {

  const [shouldBreak, setShouldBreak] = useState<boolean>(false);

  const [timerState, setTimerState] = useState<TimerState>({
    seconds: 0,
    remaining: 0,
    status: Status.Stopped,
  });

  const syncState = (state: TimerState) => {
    setTimerState(state);
  }

  useEffect(() => {
    timerProxy.state().then((state: TimerState) => {
      syncState(state);
      if (state.status == Status.Ended) {
        setShouldBreak(true);
      }
    });

    for (const event of events) {
      timerProxy.on(event, syncState);
    }

    timerProxy.on(Event.Ended, () => setShouldBreak(true));

    return () => {
      for (const event of events) {
        timerProxy.removeAllListeners(event);
      }
    }
  }, []);

  const endBreak = () => {
    setShouldBreak(false);
    timerProxy.restart();
  }

  const { seconds, remaining, status } = timerState;

  return (
    <Grommet theme={theme}>
      {shouldBreak ?
        <Break onEnd={endBreak} /> :
        <Timer
          seconds={seconds}
          remaining={remaining}
          status={status}
          onStart={() => timerProxy.start()}
          onStop={() => timerProxy.stop()}
          onRestart={() => timerProxy.restart()}
        />
      }
    </Grommet>
  );
}