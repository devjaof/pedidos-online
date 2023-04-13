import { createContext } from "vm";
import { ItemData } from "../interfaces/ItemData";
import { ReactNode, useState } from "react";

interface Item extends ItemData {
  quantity: number;
  subtotal: number;
}

interface RemoveItemProps {
  id: number;
  item: string;
}

interface UpdateCartProps {
  id: number;
  item: string;
  newQuantity: number;
}

interface CartContextProps {
  cart: Item[];

  addItem: (item: ItemData) => void;
  removeItem: ({ id, item }: RemoveItemProps) => void;
  updateCart: ({ id, item, newQuantity }: UpdateCartProps) => void;
}

export const CartContext = createContext({} as CartContextProps);

interface CartProviderProps {
  children: ReactNode;
}
