import React, { useState, useEffect } from 'react';

type BreakProps = {
  onEnd: () => void;
};

export const Break = ({ onEnd }: BreakProps) => {
  setTimeout(onEnd, 1000);
  return (<h1>TODO!</h1>);
};
