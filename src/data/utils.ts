import data from "./menu-data.json";
import { MenuData, MenuItem } from "./typings";

const menuData: MenuData = { ...data };

export const getMenuData = (): MenuData => {
  return menuData;
};

export const getMenuItem = (itemId: string): MenuItem | undefined => {
  return menuData[itemId as keyof typeof menuData] as MenuItem;
};

export const updateMenuItem = (
  itemId: string,
  newValue: Partial<MenuItem>
): MenuItem => {
  menuData[itemId as keyof typeof menuData] = {
    ...menuData[itemId],
    ...newValue,
  };
  return menuData[itemId];
};
