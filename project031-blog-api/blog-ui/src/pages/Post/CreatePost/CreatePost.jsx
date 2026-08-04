import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { Editor } from "@tinymce/tinymce-react";

import styles from "./CreatePost.module.css";
import Header from "../../../components/Header/Header.jsx";
import { UserContext } from "../../../contexts.jsx";
import { api } from "../../../api.js";

export default function CreatePost() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const titleRef = useRef(null);

  async function log() {
    if (editorRef.current) {
      const text = editorRef.current.getContent();
      const title = titleRef.current.value;

      const result = await api.post("/posts", {
        title,
        text,
      });
      navigate("/");
    }
  }

  return (
    <>
      <Header>
        <h1>Create A New Post</h1>
      </Header>
      <main>
        <div className={styles.title}>
          <div>
            <p>Title:</p>
            <input type="text" ref={titleRef} />
          </div>
          <button onClick={log}>Create</button>
        </div>
        <Editor
          apiKey="w9bbiloectwesgrtasdukus1dcf5fig7by2rrrsfszndyj0l"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            width: 1000,
            skin: window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "oxide-dark"
              : "oxide",
            content_css: window.matchMedia("(prefers-color-scheme: dark)")
              .matches
              ? "dark"
              : "default",
            plugins: [
              // Core editing features
              "anchor",
              "autolink",
              "charmap",
              "codesample",
              "emoticons",
              "link",
              "lists",
              "media",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
            ],
            toolbar:
              "undo redo | tinymceai-chat tinymceai-quickactions tinymceai-review | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            tinymceai_token_provider: async () => {
              await fetch(
                `https://demo.api.tiny.cloud/1/w9bbiloectwesgrtasdukus1dcf5fig7by2rrrsfszndyj0l/auth/random`,
                { method: "POST", credentials: "include" },
              );
              return {
                token: await fetch(
                  `https://demo.api.tiny.cloud/1/w9bbiloectwesgrtasdukus1dcf5fig7by2rrrsfszndyj0l/jwt/tinymceai`,
                  { credentials: "include" },
                ).then((r) => r.text()),
              };
            },
            uploadcare_public_key: "fdfc9dd2f80d7e1058e3",
          }}
          initialValue="Welcome to TinyMCE!"
        />
      </main>
    </>
  );
}
