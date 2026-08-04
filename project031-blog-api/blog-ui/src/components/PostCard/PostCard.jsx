import { Link } from "react-router";
import { useContext, useRef, useState } from "react";
import { EllipsisVertical, ChevronsRight } from "lucide-react";
import sanitize from "sanitize-html";

import { UserContext } from "../../contexts";
import styles from "./PostCard.module.css";
import globalStyles from "../../globals.module.css";
import { api } from "../../api";

export default function PostCard({ initialPost, onRemove }) {
  const optionsRef = useRef();
  const [post, setPost] = useState(initialPost);
  const [user, setUser] = useContext(UserContext);

  async function handlePublishToggel(post) {
    const result = await api.put("/posts/" + post.id, {
      isPublished: !post.isPublished,
    });

    setPost(result.data);
  }

  async function handleRemove(post) {
    const result = await api.delete("/posts/" + post.id);

    onRemove(post);
  }

  return (
    <div key={post.id} className={styles.post}>
      <div className={styles.header}>
        <Link className={styles.title} to={"/post/" + post.id}>
          {post.title}
        </Link>
        <div>
          {user && user.role === "ADMIN" ? (
            <>
              <button
                style={{ anchorName: `--options-anchor${post.id}` }}
                className={styles.optionsButton}
                popoverTarget={`options-popover${post.id}`}
              >
                <EllipsisVertical />
              </button>
              <div
                className={styles.optionsPopover}
                id={`options-popover${post.id}`}
                style={{ positionAnchor: `--options-anchor${post.id}` }}
                ref={optionsRef}
                popover="auto"
              >
                <button
                  className={globalStyles.linkButton}
                  onClick={() => handleRemove(post)}
                >
                  Remove
                </button>
                <button
                  className={globalStyles.linkButton}
                  onClick={() => handlePublishToggel(post)}
                >
                  {post.isPublished ? "Unpublish" : "Publish"}
                </button>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className={styles.information}>
        <p>Taha Fallahi</p>
        <p>{new Date(post.createdAt).toLocaleDateString("en-UK")}</p>
      </div>
      <p
        className={styles.text}
        dangerouslySetInnerHTML={{
          __html: sanitize(post.text.split(" ").splice(0, 100).join(" ")),
        }}
      ></p>
      <Link className={styles.readMore} to={"/post/" + post.id}>
        Read more <ChevronsRight />
      </Link>
    </div>
  );
}
