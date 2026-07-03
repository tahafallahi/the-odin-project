import { useContext } from "react";
import { Link, Outlet } from "react-router";

import { CartContext } from "../../contexts";
import globalStyles from "/src/index.module.css";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
  const [cart, setCart] = useContext(CartContext);
  const itemsCount = cart.reduce((a, b) => a + b.count, 0);

  return (
    <>
      <div className={styles.pseudoHeader}></div>
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <h1>Marron</h1>
          <h1>Shop</h1>
        </Link>
        <nav className={styles.nav}>
          <Link to="/products">Products</Link>
          <Link to="/cart" className={styles.cart}>
            <p>Cart</p>
            <span className={globalStyles.materialIcons}>shopping_cart</span>
            <div className={styles.counter}>
              <span className={globalStyles.materialIcons}>circle</span>
              <p data-testid="counter">{itemsCount}</p>
            </div>
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
