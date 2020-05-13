import React, { useEffect, useState } from "react";
import { Grommet } from 'grommet';

import { theme } from './../theme';
import { TimerState, TimerProxyInterface } from './../timer_proxy';
import { Break } from './Break';
import { Timer } from './Timer';

const timerProxy = window.expanse.timer;

const channels = [
  'started',
  'stopped',
  'restarted',
  'tick',
  'ended',
];

export const App = () => {

  const [shouldBreak, setShouldBreak] = useState<boolean>(false);

  const [timerState, setTimerState] = useState<TimerState>({
    seconds: 0,
    remaining: 0,
    status: 'stopped',
  });

  const syncState = (state: TimerState) => {
    setTimerState(state);
  }

  useEffect(() => {
    timerProxy.state().then((state: TimerState) => syncState(state));    

    for (const channel of channels) {
      timerProxy.on(channel, syncState);
    }

    timerProxy.on('ended', () => setShouldBreak(true));

    return () => {
      for (const channel of channels) {
        timerProxy.removeAllListeners(channel);
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