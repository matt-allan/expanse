import React, { useEffect, useState } from "react";
import { Grommet } from "grommet";

import { theme } from "./../theme";
import { TimerState } from "./../timer_proxy";
import { events, Event, Status } from "./../timer_types";
import { Break } from "./Break";
import { Timer } from "./Timer";
import { useDarkMode } from "../hooks/useDarkMode";
import { useTimerState } from "../hooks/useTimerState";

const timerProxy = window.expanse.timer;

export const App = (): JSX.Element => {
  const darkMode = useDarkMode();  

  const [shouldBreak, setShouldBreak] = useState(false);

  const timerState = useTimerState();

  const { seconds, remaining, status } = timerState;

  const endBreak = () => {
    setShouldBreak(false);
    timerProxy.restart();
  };

  if (status == Status.Ended && !shouldBreak) {
    setShouldBreak(true);
  }
  
  return (
    <Grommet theme={theme} themeMode={darkMode ? "dark" : "light"} full>
      {shouldBreak ? (
        <Break onEnd={endBreak} />
      ) : (
        <Timer
          seconds={seconds}
          remaining={remaining}
          status={status}
          onStart={() => timerProxy.start()}
          onStop={() => timerProxy.stop()}
          onRestart={() => timerProxy.restart()}
        />
      )}
    </Grommet>
  );
};
