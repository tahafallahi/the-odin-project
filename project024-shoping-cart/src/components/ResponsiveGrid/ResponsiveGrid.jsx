import styles from "./ResponsiveGrid.module.css";

export default function ResponsiveGrid({ children }) {
  return <div className={styles.responsiveGrid}>{children}</div>;
}
