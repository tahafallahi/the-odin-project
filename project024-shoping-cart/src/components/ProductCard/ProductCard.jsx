import { useContext, useState } from "react";

import { CartContext } from "../../contexts";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const [cart, setCart] = useContext(CartContext);
  const [numberOfOrder, setNumberOfOrders] = useState(1);

  function handleAddToCart() {
    let newCart;
    const productInCart = cart.filter((p) => p.id == product.id)[0];

    if (productInCart) {
      const count = productInCart.count;
      newCart = cart.map((p) => {
        if (p.id == product.id) {
          return { id: p.id, count: count + numberOfOrder };
        } else {
          return { id: p.id, count: p.count };
        }
      });
    } else {
      newCart = [...cart, { id: product.id, count: numberOfOrder }];
    }

    setCart(newCart);
  }

  function handleNumberChange(e) {
    setNumberOfOrders(Number(e.target.value));
  }

  return (
    <article className={styles.card}>
      <img src={product.image} />
      <div className={styles.content}>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
      <div className={styles.payment}>
        <p>{Number.parseFloat(product.price * numberOfOrder).toFixed(2)} $</p>
        <input
          type="number"
          value={numberOfOrder}
          onFocus={(e) => e.target.select()}
          onChange={handleNumberChange}
          min="1"
          max="100"
        />
        <button onClick={handleAddToCart}>Add To Cart</button>
      </div>
    </article>
  );
}
