import React, { useEffect, useState } from "react";
import { Grommet } from 'grommet';

import { theme } from './../theme';
import { TimerState, TimerProxyInterface } from './../timer_proxy';
import { Break } from './Break';
import { Timer } from './Timer';

const timerProxy = window.expanse.timer;

export const App = () => {

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
    timerProxy.on('stopped', syncState);
    timerProxy.on('started', syncState);
    timerProxy.on('reset', syncState);
    timerProxy.on('tick', syncState);
    timerProxy.on('end', syncState);
    return () => {
      timerProxy.removeAllListeners('stopped');
      timerProxy.removeAllListeners('started');
      timerProxy.removeAllListeners('reset');
      timerProxy.removeAllListeners('tick');
      timerProxy.removeAllListeners('end');
    }
  }, []);

  const endBreak = () => {
    timerProxy.reset();
  };

  const toggleStart = () => {
    status == 'started' ? timerProxy.stop() : timerProxy.start();
  };

  const onReset = () => {
    timerProxy.reset();
  };

  const { seconds, remaining, status} = timerState;

  return (
    <Grommet theme={theme}> 
      {status == 'ended' ?
        <Break onEnd={endBreak} /> :
        <Timer seconds={seconds} remaining={remaining} status={status} onStart={toggleStart} onStop={toggleStart} onReset={onReset} />
      }
    </Grommet>
  );
}