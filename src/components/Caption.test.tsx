import React from "react";
import { Caption } from "./Caption";
import { create } from "react-test-renderer";

jest.useFakeTimers();

it("renders", () => {
  const component = create(
    <Caption
      frames={[
        { start: 0, end: 3, caption: "Hello..." },
        { start: 4, end: 7, caption: "World" },
      ]}
    />
  );

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
