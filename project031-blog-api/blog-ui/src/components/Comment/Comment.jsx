import { useEffect } from "react";
import styles from "./Comment.module.css";

export default function Comment({ comment }) {
  return (
    <div className={styles.comment}>
      <p className={styles.header}>{comment.user.displayName}</p>
      <p className={styles.text}>{comment.text}</p>
    </div>
  );
}
