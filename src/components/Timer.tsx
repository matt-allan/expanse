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
  seconds: number,
  remaining: number,
  status: 'started' | 'stopped' | 'ended',
  onStart: () => void,
  onStop: () => void,
  onReset: () => void,
};

export const Timer = ({ seconds, remaining, status, onStart, onStop, onReset }: TimerProps) => {

  return (
    <React.Fragment>
      <Box align="center" justify="center" pad={{ top: 'large', bottom: 'small'}}>
        <Meter
          type="circle"
          background="light-2"
          max={seconds}
          values={[{ value: remaining }]}
        />
      </Box>
      <Box align="center" justify="center" pad="small">
        <Clock
          key={remaining == seconds ? 'reset' : 'running'}
          type="digital"
          time={interval(remaining)}
          run={status == 'started' ? 'backward' : false}
          alignSelf="center"
          size="xlarge"
          margin="xlarge"
          a11yTitle="countdown timer until next break"
        />
      </Box>
      <Box direction="row" justify="center" gap="medium" pad={{top: 'small', bottom: 'large'}}>
        <Button plain={true} icon={<Refresh />} onClick={onReset} />
        <Button plain={true} icon={status == 'started' ? <Pause /> : <Play />} onClick={status == 'started' ? onStart : onStop} />
      </Box>
    </React.Fragment>
  );
}