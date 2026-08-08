import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import sanitize from "sanitize-html";

import Header from "../../../components/Header/Header.jsx";
import Comment from "../../../components/Comment/Comment.jsx";

import globalStyles from "../../../globals.module.css";
import styles from "./PostPage.module.css";
import { UserContext } from "../../../contexts.jsx";
import { api } from "../../../api.js";

export default function PostPage() {
  const [user, setUser] = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentInputIsShown, setCommentInputIsShown] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function getPost() {
      const result = await api.get("/posts" + "/" + params.id);
      setPost(result.data);
    }

    async function getComments() {
      const result = await api.get("/comments" + "/?postId=" + params.id);
      setComments(result.data);
    }

    getPost();
    getComments();
  }, []);

  async function handleCommetSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const result = await api.post("/comments", {
      text: data.text,
      postId: post.id,
    });

    setComments([...comments, result.data]);
    setCommentInputIsShown(false);
  }

  function onRemove(comment) {
    setComments(comments.filter((c) => c.id !== comment.id));
  }

  return (
    <>
      <Header>
        <h1 className={styles.title}>{post.title}</h1>
      </Header>
      <main>
        <div className={styles.header}>
          <p>Taha Fallahi</p>
          <p>{new Date(post.createdAt).toLocaleDateString("en-UK")}</p>
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: sanitize(post.text) }}
        ></div>

        <div className={`${styles.header} ${styles.whiteBar}`}>
          <div className={styles.flex}>
            <p>Comments</p>
            <button
              className={globalStyles.linkButton}
              onClick={() => setCommentInputIsShown(!commentInputIsShown)}
            >
              Leave a Comment
            </button>
          </div>
        </div>
        <div className={styles.comments}>
          {comments.map((c) => (
            <Comment key={c.id} comment={c} onRemove={onRemove} />
          ))}
          {commentInputIsShown ? (
            <div className={styles.newComment}>
              <p className={`${styles.header} ${styles.whiteBar}`}>
                What do you think about this post?
              </p>
              <form onSubmit={handleCommetSubmit} action="POST">
                <textarea name="text" id="text"></textarea>
                <button type="submit">Send</button>
              </form>
            </div>
          ) : null}
        </div>
      </main>
      <footer></footer>
    </>
  );
}
