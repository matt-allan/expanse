import React, { useState, useEffect } from 'react';
import { Box, Button, Image } from 'grommet';

const browserWindowProxy = window.expanse.browserWindow;

type BreakProps = {
  onEnd: () => void;
};

export const Break = ({ onEnd }: BreakProps) => {

  useEffect(() => {
    browserWindowProxy.setFullscreen(true);
    return () => {
      browserWindowProxy.setFullscreen(false);
    }
  }, []);

  return (
    <React.Fragment>
      <Box align="center" justify="center" pad="small">
        <Image
            fit="cover"
            src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg"
          />
      </Box>
      <Box align="center" justify="center" pad="small">
        <Button primary label="End Break" onClick={onEnd} />
      </Box>
    </React.Fragment>
  );
};
