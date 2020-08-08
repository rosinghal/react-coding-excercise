import React, { useState, ChangeEvent, FormEvent } from "react";

import { UpdatedMenuItem } from "./typings";
import { MenuItem as MenuItemType } from "../../data/typings";
import { updateMenuItem, getMenuData } from "../../data/utils";

export const MenuItem = ({ item }: { item: MenuItemType }) => {
  const [updatedItem, setUpdatedItem] = useState<UpdatedMenuItem>({
    price: item.price,
    available: item.available,
  });
  const [showForm, setShowForm] = useState<boolean>(false);

  const onUpdateValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.currentTarget;

    let newValue: any = value;
    switch (type) {
      case "checkbox":
        newValue = checked;
        break;

      case "number":
        newValue = Number(value);
        break;

      default:
        break;
    }

    setUpdatedItem({
      ...updatedItem,
      [name]: newValue,
    });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!event.currentTarget.checkValidity()) {
      return;
    }
    event.preventDefault();
    updateMenuItem(item.itemId.toString(), updatedItem);
    console.log("Updated menu data", getMenuData()); // as per requirement
    setShowForm(false);
  };

  const onReset = (event: FormEvent) => {
    event.preventDefault();
    setUpdatedItem({
      price: item.price,
      available: item.available,
    });
  };

  return (
    <div className="card" data-testid="card">
      <div className="card__title">{item.name}</div>
      <div className="card__price">${updatedItem.price}</div>
      {!updatedItem.available && <div>(Not available)</div>}
      <div className="card__image-wrapper">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <button type="button" onClick={() => setShowForm(!showForm)}>
        Edit
      </button>

      {showForm && (
        <form onSubmit={onSubmit} className="card-form">
          <div>
            <label>
              Price
              <input
                name="price"
                type="number"
                value={updatedItem.price}
                onChange={onUpdateValue}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Is available?
              <input
                name="available"
                type="checkbox"
                checked={updatedItem.available}
                onChange={onUpdateValue}
              />
            </label>
          </div>
          <div className="card-form__actions">
            <button type="submit">Submit</button>
            <button
              className="card-form__actions__reset"
              type="reset"
              onClick={onReset}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
