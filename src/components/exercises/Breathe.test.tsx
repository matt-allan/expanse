import React from "react";
import { shallow } from "enzyme";

import { Breathe } from "./Breathe";

jest.useFakeTimers();

it("renders", () => {
  const component = shallow(<Breathe onEnd={jest.fn()} />);

  expect(component).toMatchSnapshot();
});
