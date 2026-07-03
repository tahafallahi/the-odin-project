import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import ResponsiveGrid from "../../components/ResponsiveGrid/ResponsiveGrid";
import ProductCard from "../../components/ProductCard/ProductCard";
import LoadingProductCard from "../../components/LoadingProductCard/LoadingProductCard";
import styles from "./ProductsPage.module.css";

const apiPath = "https://fakestoreapi.com/products";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  let params = useParams();

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
    <main>
      <h2 className={styles.title}>
        {params.category
          ? params.category
              .split(" ")
              .map(
                (excerpt) =>
                  excerpt.split("")[0].toUpperCase() + excerpt.slice(1),
              )
              .join(" ")
          : ""}
      </h2>
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
          {!params.category
            ? products.map((product) => {
                return (
                  <ProductCard key={product.id} product={product}></ProductCard>
                );
              })
            : products.map((product) => {
                if (product.category == params.category) {
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                    ></ProductCard>
                  );
                }
              })}
        </ResponsiveGrid>
      ) : (
        <p className={styles.error}>
          An error occured. <br /> Failed load products.
        </p>
      )}
    </main>
  );
}
