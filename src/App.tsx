import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from 'react-dom';
import { Grommet, Box, Button, Clock, Heading, Meter } from 'grommet';
import { Play, Pause, Resume, Refresh } from "grommet-icons";

import { theme } from './theme';

const TIME_REGEXP = /P([0-9]+)H([0-9]+)M([0-9]+)S/;

// todo: make configurable
const MINUTES_PER_SESSION = 25;

const App = () => {
  const [paused, setPaused] = useState(true);

  const [secondsLeft, setSecondsLeft] = useState(MINUTES_PER_SESSION * 60);

  const onChange = (time: any) => {
    let match = TIME_REGEXP.exec(time);
    if (!match) {
      console.error(`Cannot parse '${time}'`);
      return;
    }
    const hours = parseFloat(match[1]);
    const minutes = parseFloat(match[2]) || 0;
    const seconds = parseFloat(match[3]) || 0;

    setSecondsLeft(
      (hours * 60 * 60) + (minutes * 60) + seconds
    );
  };

  return (
    <div>
      <Grommet theme={theme}> 
        <Box align="center" justify="center" pad={{ top: 'large', bottom: 'small'}}>
          <Meter
            type="circle"
            background="light-2"
            max={MINUTES_PER_SESSION * 60}
            values={[{ value: secondsLeft }]}
          />
        </Box>
        <Box align="center" justify="center" pad="small">
          <Clock
            key={secondsLeft == MINUTES_PER_SESSION * 60 ? 'restarted' : 'running'}
            type="digital"
            time={`PT0H${MINUTES_PER_SESSION}M0S`}
            run={paused ? false : 'backward'}
            onChange={onChange}
            alignSelf="center"
            size="xlarge"
            margin="xlarge"
            a11yTitle="countdown timer until next break"
          />
          </Box>
        <Box direction="row" justify="center" gap="medium" pad={{top: 'small', bottom: 'large'}}>
          <Button plain={true} icon={<Refresh />} onClick={() => setSecondsLeft(MINUTES_PER_SESSION * 60)} />
          <Button plain={true} icon={paused ? <Play /> : <Pause />} onClick={() => setPaused(!paused)} />
        </Box>
      </Grommet>
    </div>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);