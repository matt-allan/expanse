import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import './index.css';
import * as theme from './theme.json';

ReactDOM.render(
  <div>
  {/*
    // @ts-ignore */}
    <Grommet theme={theme}> 
      <div>hello world from React! </div>
    </Grommet>
  </div>,
  document.getElementById('root')
);