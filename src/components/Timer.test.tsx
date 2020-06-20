import React from "react";
import { shallow } from "enzyme";

import { Timer } from "./Timer";
import { Status } from "./../timer_types";

jest.useFakeTimers();

it("renders", () => {
  const component = shallow(
    <Timer
      seconds={5 * 60}
      remaining={5 * 60}
      status={Status.Stopped}
      onStart={jest.fn()}
      onStop={jest.fn()}
      onRestart={jest.fn()}
    />
  );

  expect(component).toMatchSnapshot();
});
