import { ItemData } from "../interfaces/ItemData";
import { ReactNode, useState, createContext } from "react";

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
  // removeItem: ({ id, item }: RemoveItemProps) => void;
  // updateCart: ({ id, item, newQuantity }: UpdateCartProps) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextProps);

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Item[]>([]);

  function addItem(item: ItemData): void {
    const itemFound = cart.find((i) => i.type === item.type && i.id === item.id);

    if (itemFound) {
      const newCart = cart.map((mapItem) => {
        if (mapItem.id === item.id) {
          const quantity = mapItem.quantity + 1;
          const subtotal = mapItem.price * quantity;

          return { ...item, quantity, subtotal};
        }
        return mapItem;
      })

      setCart(newCart);
      console.log('carrinho de compras atualizado:: ', newCart);
      return;
    }

    const newItem = {...item, quantity: 1, subtotal: item.price};
    const newCart = [...cart, newItem];

    setCart(newCart);
    console.log('carrinho de compras atualizado:: ', newCart);
  }

  return <CartContext.Provider value={{ cart, addItem }}>
    {children}
  </CartContext.Provider>

}