import { useState } from "react";
import { CartContext } from "../src/contexts";

export function MockCartContextProvider({ children }) {
  const [cart, setCart] = useState([
    {
      id: 2,
      count: 1,
    },
    {
      id: 3,
      count: 10,
    },
  ]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}
