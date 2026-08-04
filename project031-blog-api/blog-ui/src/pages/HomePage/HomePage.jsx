import { useContext, useEffect, useState } from "react";
import WaveBar from "../../components/WaveBar/WaveBar.jsx";
import Header from "../../components/Header/Header.jsx";
import { Link } from "react-router";
import { UserContext } from "../../contexts.jsx";

import styles from "./HomePage.module.css";

import PostCard from "../../components/PostCard/PostCard.jsx";
import { api } from "../../api.js";

export default function HomePage() {
  const [user, setUser] = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      console.log(user);
      const result = await api.get("/posts");
      setPosts(result.data);
    }

    getPosts();
  }, [user]);

  function handleRemove(post) {
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <>
      <Header>
        <h1>The Magnificent Blog</h1>
      </Header>
      <WaveBar />
      <main>
        <div className={styles.posts}>
          {posts.length > 0
            ? posts.map((p) => (
                <PostCard key={p.id} initialPost={p} onRemove={handleRemove} />
              ))
            : "There are no Posts."}{" "}
          // add a loading state
        </div>
      </main>
      <footer></footer>
    </>
  );
}
