import React, { useEffect } from "react";
import { Box } from "grommet";

import { Breathe } from "./exercises/Breathe";

const browserWindow = window.expanse.browserWindow;

type BreakProps = {
  onEnd: () => void;
};

export const Break = ({ onEnd }: BreakProps): JSX.Element => {
  useEffect(() => {
    browserWindow.setFullScreen(true);

    return () => browserWindow.setFullScreen(false);
  }, []);

  return (
    <Box align="center" justify="center" pad="small" height="100vh">
      <Breathe onEnd={onEnd} />
    </Box>
  );
};
