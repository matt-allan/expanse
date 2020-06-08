import React from "react";
import { Box } from "grommet";

export const Exercise = ({
  children,
}: React.PropsWithChildren<unknown>): JSX.Element => {
  return (
    <Box align="center" justify="center" pad="small" height="100vh">
      {React.Children.map(children, (child) => (
        <Box align="center" justify="center" pad="small" height="100vh">
          {child}
        </Box>
      ))}
    </Box>
  );
};
