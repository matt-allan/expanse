import React, { useState } from "react";
import { Grommet } from "grommet";

import { theme } from "./../theme";
import { Status } from "./../timer_types";
import { Breathe } from "./exercises/Breathe";
import { Timer } from "./Timer";
import { useDarkMode } from "../hooks/useDarkMode";
import { useTimerState } from "../hooks/useTimerState";
import { timer as timerProxy } from "../expanse";

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
        <Breathe onEnd={endBreak} />
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
