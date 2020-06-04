import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { defaultProps, Button } from "grommet";

// Only undefined if you overwrite the theme and don't deepMerge.
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const colors = defaultProps!.theme!.global!.colors!;

const pulse = keyframes`
  0% {
    transform: scale(0.1) rotate(180deg);
  }
  100% {
    transform: scale(0.1);
  }
}
`;

const resize = keyframes`
  0% {
    transform: scale(1) 
  }
  100% {
    transform: scale(10) 
  }
`;

const Container = styled.div`
  height: 125px;
  width: 125px;
  animation: ${pulse} 4s ease alternate infinite;
`;

const Circle = styled.div`
  height: 125px;
  width: 125px;
  border-radius: 50%;
  position: absolute;
  top: 50px;
  left: 50px;
  opacity: 0.75;
  animation: ${resize} 4s ease alternate infinite;
  mix-blend-mode: screen;

  &:nth-child(odd) {
    background: ${colors["accent-1"]};
  }

  &:nth-child(even) {
    background: ${colors["accent-3"]};
  }

  &:nth-child(1) {
    transform-origin: 95% 75%;
  }

  &:nth-child(2) {
    transform-origin: 50% 100%;
  }

  &:nth-child(3) {
    transform-origin: 5% 75%;
  }

  &:nth-child(4) {
    transform-origin: 95% 25%;
  }

  &:nth-child(5) {
    transform-origin: 50% 0%;
  }

  &:nth-child(6) {
    transform-origin: 5% 25%;
  }
`;

type BreatheProps = {
  onEnd: () => void;
};

export const Breathe = ({ onEnd }: BreatheProps): JSX.Element => {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFinished(true), 1000 * 60 * 2);

    return () => clearTimeout(timer);
  }, []);

  if (finished) {
    return <Button primary label="Back to work" onClick={onEnd} />;
  }

  return (
    <Container>
      <Circle />
      <Circle />
      <Circle />
      <Circle />
      <Circle />
      <Circle />
    </Container>
  );
};
