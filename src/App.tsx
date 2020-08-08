import React from "react";
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";

import { Menu } from "./pages/Menu/Menu";
import { MenuItem } from "./pages/MenuItem/MenuItem";
import { getMenuItem } from "./data/utils";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <div>
          <NavLink to="/">All items</NavLink>
        </div>
        <div>
          <Switch>
            <Route
              exact
              path="/item/:itemId"
              render={(routeProps) => {
                const item = getMenuItem(routeProps.match.params.itemId);
                if (!item) {
                  return <div>Menu item not found</div>;
                }

                return <MenuItem item={item} />;
              }}
            />
            <Route path="/" component={Menu} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
