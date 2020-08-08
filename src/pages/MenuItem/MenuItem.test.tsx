import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

import { MenuItem } from "./MenuItem";
import { getMenuData } from "../../data/utils";

const menuData = getMenuData();
const menuItem = menuData[Object.keys(menuData)[0]];

test("renders item correctly", () => {
  const { getAllByTestId } = render(
    <BrowserRouter>
      <MenuItem item={menuItem} />
    </BrowserRouter>
  );
  const linkElements = getAllByTestId("card");
  expect(linkElements.length).toEqual(1);
});

test("renders form when edit button is clicked", () => {
  const { container } = render(
    <BrowserRouter>
      <MenuItem item={menuItem} />
    </BrowserRouter>
  );
  const buttonElement = container.querySelector("button");

  expect(container.querySelector("form")).toEqual(null);

  buttonElement?.click();

  expect(container.querySelector("form")).not.toEqual(null);
});

test("updates menuData when form is submitted", () => {
  const { container } = render(
    <BrowserRouter>
      <MenuItem item={menuItem} />
    </BrowserRouter>
  );
  const buttonElement = container.querySelector("button");

  buttonElement?.click();

  const formElement = container.querySelector("form");
  const inputPriceElement = container.querySelector("input[name='price']");
  const inputIsAvailableElement = container.querySelector(
    "input[name='available']"
  );

  if (inputPriceElement) {
    fireEvent.change(inputPriceElement, {
      target: { value: menuItem.price + 1 },
    });
  }

  if (inputIsAvailableElement) {
    fireEvent.click(inputIsAvailableElement);
  }

  if (formElement) {
    fireEvent.submit(formElement);
  }

  const updatedMenuItem = getMenuData()[menuItem.itemId];

  expect(updatedMenuItem.price).toEqual(menuItem.price + 1);
  expect(updatedMenuItem.available).toEqual(!menuItem.available);
});

test("reset button works correctly", () => {
  const { container } = render(
    <BrowserRouter>
      <MenuItem item={menuItem} />
    </BrowserRouter>
  );
  const buttonElement = container.querySelector("button");

  buttonElement?.click();

  const formElement = container.querySelector("form");
  const inputPriceElement = container.querySelector("input[name='price']");
  const inputIsAvailableElement = container.querySelector(
    "input[name='available']"
  );
  const resetButtonElement = container.querySelector("button[type='reset']");

  if (inputPriceElement) {
    fireEvent.change(inputPriceElement, {
      target: { value: menuItem.price + 1 },
    });
  }

  if (inputIsAvailableElement) {
    fireEvent.click(inputIsAvailableElement);
  }

  if (resetButtonElement) {
    fireEvent.click(resetButtonElement);
  }

  if (inputPriceElement) {
    expect(inputPriceElement?.getAttribute("value")).toEqual(
      menuItem.price.toString()
    );
  }
});
