import { useState } from "react";
import { CartContext } from "./contexts";

export function CartContextProvidor({ children }) {
  const [cart, setCart] = useState([]);
  return <CartContext value={[cart, setCart]}>{children}</CartContext>;
}
