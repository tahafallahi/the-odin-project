import { useState } from "react";
import { CartContext } from "../src/contexts";
import { Outlet } from "react-router";

export function MockCartContextProvider() {
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
    <CartContext value={[cart, setCart]}>
      <Outlet />
    </CartContext>
  );
}

export function EmptyMockCartContextProvider() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext value={[cart, setCart]}>
      <Outlet />
    </CartContext>
  );
}
