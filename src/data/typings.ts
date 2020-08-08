interface TimePeriod {
  price: number | null;
  description: string | null;
  daysOfWeek: number[];
  period: string[][];
  alwaysAvailable?: boolean;
}

export interface MenuItem {
  name: string;
  category: string;
  itemId: number;
  imageUrl: string;
  price: number;
  tax: number;
  available: boolean;
  description: string;
  modifierGroups: Object;
  timePeriods: TimePeriod[];
}

export interface MenuData {
  [key: string]: MenuItem;
}
