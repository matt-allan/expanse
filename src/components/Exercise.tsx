import React, { useEffect } from "react";
import { Box, Button, Layer } from "grommet";
import { LinkPrevious } from "grommet-icons";
import styled from "styled-components";

import { useVisisbleOnMouseMove } from "../hooks/useVisibleOnMouseMove";
import { browserWindow } from "../expanse";

type ExerciseProps = {
  finished: boolean;
  onEnd: () => void;
};

const StyledLinkPrevious = styled(LinkPrevious)`
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.6);
  }
`;

export const Exercise = ({
  children,
  finished,
  onEnd,
}: React.PropsWithChildren<ExerciseProps>): JSX.Element => {
  const overlayVisible = useVisisbleOnMouseMove(2000);

  useEffect(() => {
    browserWindow.setFullScreen(true);

    return () => browserWindow.setFullScreen(false);
  }, []);

  if (finished) {
    return <Button primary label="Back to work" onClick={onEnd} />;
  }

  return (
    <Box align="center" justify="center" pad="small" fill>
      {overlayVisible && (
        <Layer
          animation="fadeIn"
          margin="large"
          modal={false}
          full
          plain
          position="top-right"
        >
          <Button
            plain
            icon={<StyledLinkPrevious size="medium" />}
            focusIndicator={false}
            hoverIndicator={{ size: "xlarge" }}
            onClick={onEnd}
          />
        </Layer>
      )}
      {React.Children.map(children, (child) => (
        <Box align="center" justify="center" pad="small" height="100vh">
          {child}
        </Box>
      ))}
    </Box>
  );
};
