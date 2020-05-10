import React, { useEffect, useState } from "react";
import { Grommet } from 'grommet';

import { theme } from './../theme';
import { Timer } from './Timer';
import { Break } from './Break';

const timerProxy = window.expanse.timer;

export const App = () => {
  const [shouldBreak, setShouldBreak] = useState(false);

  useEffect(() => {
    timerProxy.on('end', () => {
      // todo: need to sync this state from the main process, so it
      // still works when end happens while the window is closed
      setShouldBreak(true);
    });
    return () => {
      timerProxy.removeAllListeners('end');
    }
  }, []);

  const endBreak = () => {
    setShouldBreak(false);
    // todo: restart timer without auto-starting it.
  }

  return (
    <Grommet theme={theme}> 
      {shouldBreak ?
        <Break timerProxy={timerProxy} onEnd={endBreak} /> :
        <Timer timerProxy={timerProxy} />
      }
    </Grommet>
  );
}