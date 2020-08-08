import React from "react";

import { getMenuData } from "../../data/utils";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <div className="menu">
      {Object.entries(getMenuData()).map(([key, item]) => {
        return (
          <div key={item.itemId} className="card" data-testid="card">
            <div className="card__image-wrapper">
              <Link to={`/item/${item.itemId}`}>
                <img src={item.imageUrl} alt={item.name} />
              </Link>
            </div>
            <div className="card__title">
              <Link to={`/item/${item.itemId}`}>{item.name}</Link>
            </div>
            <div className="card__price">${item.price}</div>
            {!item.available && <div>(Not available)</div>}
          </div>
        );
      })}
    </div>
  );
};
