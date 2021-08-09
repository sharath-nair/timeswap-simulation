export interface User {
  id?: number;
  name?: string;
  email?: string;
  assetHeld?: number;
  collateralHeld?: number;
  isSelected?: boolean;
  [key: string]: string | boolean | number;
}
