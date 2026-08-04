import { useRef, useState } from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router";

import Header from "../../../components/Header/Header";

export default function RegisterPage() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const passwordRef = useRef(null);

  function checkPasswordsAreEqual(e) {
    e.target.value !== passwordRef.current.value
      ? e.target.setCustomValidity("Passwords don't match")
      : e.target.setCustomValidity("");
  }

  function checkPasswordLength(e) {
    e.target.value.length < 8
      ? e.target.setCustomValidity("Password should be at least 8 charachters.")
      : e.target.setCustomValidity("");
  }

  async function sendData(e) {
    e.preventDefault();
    const { password2, ...data } = Object.fromEntries(new FormData(e.target));

    try {
      const result = await api.post("/register", data);
      return navigate("/login");
    } catch (err) {
      if (err.status === 400) {
        setError("A user with this email already exists.");
      } else {
        setError("There was a problem, please try again later.");
      }
    }
  }
  return (
    <>
      <Header>
        <h1>Sign Up</h1>
        <p className={styles.description}>To become one magnificent member</p>
      </Header>
      <main>
        <form onSubmit={sendData}>
          {error ? <p className="error-message">{error}</p> : null}
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" required />
          </div>

          <div>
            <label htmlFor="name">Your Name</label>
            <input type="text" name="displayName" id="name" required />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onInput={checkPasswordLength}
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
              required
            />
          </div>

          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              onInput={checkPasswordsAreEqual}
              type="password"
              name="password2"
              id="password2"
              required
            />
          </div>

          <button type="submit">Send</button>
        </form>
      </main>
    </>
  );
}
