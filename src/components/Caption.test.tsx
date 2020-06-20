import React from "react";
import { shallow } from "enzyme";
import { Text } from "grommet";

import { Caption } from "./Caption";

jest.useFakeTimers();

it("renders", () => {
  const component = shallow(
    <Caption
      frames={[
        { start: 0, end: 3, caption: "Hello..." },
        { start: 4, end: 7, caption: "World" },
      ]}
    />
  );

  expect(component).toMatchSnapshot();
});

it("shows captions", () => {
  const wrapper = shallow(
    <Caption
      frames={[
        { start: 0, end: 3, caption: "Hello..." },
        { start: 4, end: 7, caption: "World" },
      ]}
    />
  );

  expect(wrapper.find(Text).dive().text()).toEqual("Hello...");

  jest.advanceTimersByTime(4000);

  expect(wrapper.find(Text).dive().text()).toEqual("World");

  jest.advanceTimersByTime(4000);

  expect(wrapper.type()).toEqual(null);
});
