import { useState, useContext } from "react";

import { CartContext } from "../../contexts";
import styles from "./SimpleProductCard.module.css";

export default function SimpleProductCard({ product }) {
  const [cart, setCart] = useContext(CartContext);

  const pToRemove = cart.filter((p) => p.id == product.id)[0];
  const [count, setCount] = useState(pToRemove.count);

  function handleNumberChange(e) {
    const newCount = Number(e.target.value);
    setCount(newCount);
    if (newCount > 0) {
      setCart([
        ...cart.filter((p) => p.id != pToRemove.id),
        { id: pToRemove.id, count: newCount },
      ]);
    } else {
      setCart(cart.filter((p) => p.id != pToRemove.id));
    }
  }

  return (
    <article className={styles.card}>
      <img src={product.image} />
      <div className={styles.content}>
        <h3>{product.title}</h3>
      </div>
      <div className={styles.payment}>
        <p>{Number.parseFloat(product.price * count).toFixed(2)} $</p>
        <p>Number in your cart:</p>
        <input
          type="number"
          value={count}
          onChange={handleNumberChange}
          min="0"
          max="100"
        />
      </div>
    </article>
  );
}
