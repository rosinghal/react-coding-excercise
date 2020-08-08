import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { Menu } from "./Menu";
import { getMenuData } from "../../data/utils";

test("renders all menu data", () => {
  const { getAllByTestId } = render(
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  );
  const linkElements = getAllByTestId("card");
  expect(linkElements.length).toEqual(Object.keys(getMenuData()).length);
});
