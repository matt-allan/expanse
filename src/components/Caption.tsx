import React, { useEffect, useState } from "react";
import { Box, Text } from "grommet";

type Frame = {
  start: number;
  end: number;
  caption: string;
};

type CaptionProps = {
  frames: Frame[];
};

export const Caption = ({ frames }: CaptionProps): JSX.Element | null => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  for (const frame of frames) {
    if (frame.start <= seconds && frame.end >= seconds) {
      return (
        <Box
          animation={[
            { type: "fadeIn", delay: frame.start * 1000, duration: 1000 },
            { type: "fadeOut", delay: frame.end * 1000 - 500, duration: 500 },
          ]}
        >
          <Text>{frame.caption}</Text>
        </Box>
      );
    }
  }

  return null;
};
