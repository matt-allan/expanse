import React, { useEffect, useState } from 'react';
import { Grommet, Box, Button, Clock, Heading, Meter } from 'grommet';
import { Play, Pause, Resume, Refresh } from "grommet-icons";
import { TimerState, TimerProxyInterface } from './../timer_proxy';

const interval = (remaining: number): string => {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining - (minutes * 60);

  return `PT0H${minutes}M${seconds}S`;
}

type TimerProps = {
  timerProxy: TimerProxyInterface
};

export const Timer = ({ timerProxy }: TimerProps) => {
  const [running, setRunning] = useState(false);

  const [seconds, setSeconds] = useState({seconds: 0, remaining: 0});

  const syncState = (state: TimerState) => {
    const { seconds, remaining, status} = state;
    setSeconds({ seconds, remaining });
    setRunning(status == 'started');
  }

  useEffect(() => {
    timerProxy.state().then((state: TimerState) => syncState(state));
    timerProxy.on('stopped', syncState);
    timerProxy.on('started', syncState);
    timerProxy.on('restarted', syncState);
    timerProxy.on('tick', syncState);
    return () => {
      timerProxy.removeAllListeners('stopped');
      timerProxy.removeAllListeners('started');
      timerProxy.removeAllListeners('restarted');
      timerProxy.removeAllListeners('tick');
    }
  }, []);

  const restart = () => {
    setSeconds({
      ...seconds,
      remaining: seconds.seconds,
    });
    setRunning(true);
    timerProxy.restart();
  };

  const toggleRunning = () => {
    setRunning(!running);
    running ? timerProxy.stop() : timerProxy.start();
  }

  return (
    <React.Fragment>
      <Box align="center" justify="center" pad={{ top: 'large', bottom: 'small'}}>
        <Meter
          type="circle"
          background="light-2"
          max={seconds.seconds}
          values={[{ value: seconds.remaining }]}
        />
      </Box>
      <Box align="center" justify="center" pad="small">
        <Clock
          key={seconds.remaining == seconds.seconds ? 'restarted' : 'running'}
          type="digital"
          time={interval(seconds.remaining)}
          run={!running ? false : 'backward'}
          alignSelf="center"
          size="xlarge"
          margin="xlarge"
          a11yTitle="countdown timer until next break"
        />
      </Box>
      <Box direction="row" justify="center" gap="medium" pad={{top: 'small', bottom: 'large'}}>
        <Button plain={true} icon={<Refresh />} onClick={restart} />
        <Button plain={true} icon={running ? <Pause /> : <Play />} onClick={toggleRunning} />
      </Box>
    </React.Fragment>
  );
}