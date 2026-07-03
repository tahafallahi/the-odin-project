import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import axios from "axios";

import ResponsiveGrid from "../../components/ResponsiveGrid/ResponsiveGrid";

import LoadingProductCard from "../../components/LoadingProductCard/LoadingProductCard";
import { CartContext } from "../../contexts";
import styles from "./CartPage.module.css";
import SimpleProductCard from "../../components/SimpleProductCard/SimpleProductCard";

const apiPath = "https://fakestoreapi.com/products";

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useContext(CartContext);

  const sortedCart = cart.sort((a, b) => a.id - b.id);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(apiPath);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <>
      <main>
        <h2 className={styles.title}>Your Cart</h2>
        {isLoading ? (
          <ResponsiveGrid>
            {Array(10)
              .fill(0)
              .map((n, i) => (
                <LoadingProductCard key={i}></LoadingProductCard>
              ))}
          </ResponsiveGrid>
        ) : !error ? (
          <ResponsiveGrid>
            {sortedCart.length > 0 ? (
              sortedCart.map((pInCart) => {
                const p = products.filter((p) => p.id == pInCart.id)[0];
                return (
                  <SimpleProductCard key={p.id} product={p}></SimpleProductCard>
                );
              })
            ) : (
              <p>There's no items in your cart.</p>
            )}
          </ResponsiveGrid>
        ) : (
          <p className={styles.error}>
            An error occured. <br /> Failed load products.
          </p>
        )}
      </main>
    </>
  );
}
