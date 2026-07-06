import { useState, useContext } from "react";

import { CartContext } from "../../contexts";
import styles from "./SimpleProductCard.module.css";

export default function SimpleProductCard({ product }) {
  const [cart, setCart] = useContext(CartContext);

  const pToRemove = cart.filter((p) => p.id == product.id)[0];
  const [count, setCount] = useState(pToRemove.count);

  function handleNumberChange(e) {
    if (e.target.value) {
      const newCount = Number(e.target.value);
      setCount(newCount);
      setCart([
        ...cart.filter((p) => p.id != pToRemove.id),
        { id: pToRemove.id, count: newCount },
      ]);
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
          onFocus={(e) => e.target.select()}
          onChange={handleNumberChange}
          min="0"
          max="100"
        />
      </div>
    </article>
  );
}
