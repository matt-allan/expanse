import React, { useState } from 'react';
import { Grommet, Box, Button, Clock, Heading, Meter } from 'grommet';
import { Play, Pause, Resume, Refresh } from "grommet-icons";

const DURATION_REGEXP = /P([0-9]+)H([0-9]+)M([0-9]+)S/;

const SECONDS_PER_SESSION = 25 * 60;

const parseDuration = (duration: string): number => {
    let match = DURATION_REGEXP.exec(duration);

    if (!match) {
      throw `Cannot parse '${duration}'`;
    }

    const hours = parseFloat(match[1]);
    const minutes = parseFloat(match[2]) || 0;
    const seconds = parseFloat(match[3]) || 0;

    return (hours * 60 * 60) + (minutes * 60) + seconds;
}

export const Timer = () => {
  const [paused, setPaused] = useState(true);

  const [secondsLeft, setSecondsLeft] = useState(SECONDS_PER_SESSION);

  return (
    <React.Fragment>
      <Box align="center" justify="center" pad={{ top: 'large', bottom: 'small'}}>
        <Meter
          type="circle"
          background="light-2"
          max={SECONDS_PER_SESSION}
          values={[{ value: secondsLeft }]}
        />
      </Box>
      <Box align="center" justify="center" pad="small">
        <Clock
          key={secondsLeft == SECONDS_PER_SESSION ? 'restarted' : 'running'}
          type="digital"
          time={`PT0H${SECONDS_PER_SESSION / 60}M0S`}
          run={paused ? false : 'backward'}
          onChange={(time: any) => setSecondsLeft(parseDuration(time))}
          alignSelf="center"
          size="xlarge"
          margin="xlarge"
          a11yTitle="countdown timer until next break"
        />
      </Box>
      <Box direction="row" justify="center" gap="medium" pad={{top: 'small', bottom: 'large'}}>
        <Button plain={true} icon={<Refresh />} onClick={() => setSecondsLeft(SECONDS_PER_SESSION)} />
        <Button plain={true} icon={paused ? <Play /> : <Pause />} onClick={() => setPaused(!paused)} />
      </Box>
    </React.Fragment>
  );
}