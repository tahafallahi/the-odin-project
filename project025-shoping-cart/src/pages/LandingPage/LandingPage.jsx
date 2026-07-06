import { Link } from "react-router";
import styles from "./LandingPage.module.css";
import ExandingText from "/src/components/ExpandingText/ExpandingText.jsx";

export default function HomePage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.title}>
          <ExandingText color="black">Marron</ExandingText>
          <ExandingText color="black">Shop</ExandingText>
        </div>
      </header>
      <main className={styles.content}>
        <p>We sell the best clothes ever created.</p>
        <div className={styles.textCardContainer}>
          <Link to="products/men's clothing">Buy Men's Clothing</Link>
          <div className={styles.cards}>
            <img
              src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
              alt=""
            />
            <img
              src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png"
              alt=""
            />
            <img
              src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png"
              alt=""
            />
            <img
              src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png"
              alt=""
            />
            <img
              src="https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png"
              alt=""
            />
          </div>
        </div>
        <div className={styles.textCardContainer}>
          <Link to="products/women's clothing">Buy Women's Clothing</Link>
          <div className={styles.cards}>
            <img
              src="https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png"
              alt=""
            />
            <img
              src="https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png"
              alt=""
            />
            <img
              src="https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png"
              alt=""
            />
            <img
              src="https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png"
              alt=""
            />
            <img
              src="https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png"
              alt=""
            />
          </div>
        </div>
      </main>
    </>
  );
}
