import React from "react";
import { Grommet } from 'grommet';

import { theme } from './../theme';
import { Timer } from './Timer';

export const App = () => {
  return (
    <Grommet theme={theme}> 
      <Timer />
    </Grommet>
  );
}