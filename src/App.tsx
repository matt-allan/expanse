import React, { useState, useEffect, useRef } from "react";
import * as ReactDOM from 'react-dom';
import { Grommet, Box, Button, Clock, Heading, Meter } from 'grommet';
import { Play, Pause, Resume, Refresh } from "grommet-icons";

import { theme } from './theme';

const App = () => {
  const [value, setValue] = useState(20);

  const timer = useRef();
  clearTimeout(timer.current);
  // @ts-ignore
  timer.current = setTimeout(() => {
    setValue(value < 100 ? value + 8 : 20);
  }, 2000);

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div>
      <Grommet theme={theme}> 
        <Box align="center" justify="center" pad={{ top: 'large', bottom: 'small'}}>
          <Meter
            type="circle"
            background="light-2"
            values={[{ value, color: value > 50 ? "accent-2" : "accent-1" }]}
          />
        </Box>
        <Box align="center" justify="center" pad="small">
          <Clock
            type="digital"
            time="T00:25:00"
            precision="seconds"
            run="backward"
            alignSelf="center"
            size="xlarge"
            margin="xlarge"
            a11yTitle="countdown timer until next break"
          />
        </Box>
        <Box direction="row" justify="center" gap="medium" pad="small">
          <Button plain={true} icon={<Refresh />} onClick={() => {}} />
          <Button plain={true} icon={<Play />} onClick={() => {}} />
        </Box>
      </Grommet>
    </div>
  );
}

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);