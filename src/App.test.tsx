import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

test("renders all items text", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/All items/i);
  expect(linkElement).toBeInTheDocument();
});
