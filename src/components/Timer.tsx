import React, { useState, useEffect } from 'react';
import { Grommet, Box, Button, Clock, Heading, Meter } from 'grommet';
import { Play, Pause, Resume, Refresh } from "grommet-icons";

const DURATION_REGEXP = /P([0-9]+)H([0-9]+)M([0-9]+)S/;

const timerProxy = window.expanse.timer;

const parseDuration = (duration: string): number => {
    let match = DURATION_REGEXP.exec(duration);

    if (!match) {
      throw `Cannot parse '${duration}'`;
    }

    const hours = parseFloat(match[1]);
    const minutes = parseFloat(match[2]) || 0;
    const seconds = parseFloat(match[3]) || 0;

    return (hours * 60 * 60) + (minutes * 60) + seconds;
};

const interval = (remaining: number): string => {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining - (minutes * 60);

  return `PT0H${minutes}M${seconds}S`;
}

export const Timer = () => {
  const [running, setRunning] = useState(false);

  const [seconds, setSeconds] = useState({seconds: 0, remaining: 0});

  useEffect(() => {
    (async () => {
      setSeconds(await timerProxy.seconds());
      setRunning(await timerProxy.running());
    })();
  }, []);

  useEffect(() => {
    timerProxy.on('stopped', () => setRunning(false));
    timerProxy.on('started', () => setRunning(true));
    timerProxy.on('restarted', async () => {
      // todo: get from event
      setSeconds(await timerProxy.seconds());
      setRunning(true);
    });
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
          onChange={(time: any) => setSeconds({...seconds, remaining: parseDuration(time)})}
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