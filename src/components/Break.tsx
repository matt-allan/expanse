import React, { useState, useEffect } from 'react';

import { TimerState, TimerProxyInterface } from './../timer_proxy';

type BreakProps = {
  timerProxy: TimerProxyInterface;
  onEnd: () => void;
};

export const Break = ({ timerProxy, onEnd }: BreakProps) => {
  setTimeout(onEnd, 5000);
  return (<h1>TODO!</h1>);
};
