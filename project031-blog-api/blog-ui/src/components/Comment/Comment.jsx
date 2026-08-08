import { useContext, useEffect } from "react";
import styles from "./Comment.module.css";
import { UserContext } from "../../contexts";
import { api } from "../../api";

export default function Comment({ comment, onRemove }) {
  const [user, setUser] = useContext(UserContext);

  async function handleDelete() {
    try {
      const result = await api.delete("/comments/" + comment.id);
      onRemove(comment);
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        <p>{comment.user.displayName}</p>
        {user && (comment.user.id === user.sub || user.role == "ADMIN") ? (
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button>Edit</button>
          </div>
        ) : null}
      </div>
      <p className={styles.text}>{comment.text}</p>
    </div>
  );
}
