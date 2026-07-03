import styles from "./ExpandingText.module.css";

export default function ExpandingText({ children }) {
  return <h1 className={styles.expandingText}>{children}</h1>;
}
