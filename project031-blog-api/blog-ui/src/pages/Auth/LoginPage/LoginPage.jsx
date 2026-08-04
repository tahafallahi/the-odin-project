import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { api, setAuthorization } from "../../../api.js";

import { UserContext } from "../../../contexts.jsx";
import Header from "../../../components/Header/Header.jsx";

export default function LoginPage() {
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  function checkPasswordLength(e) {
    e.target.value.length < 8
      ? e.target.setCustomValidity("Password should be at least 8 charachters.")
      : e.target.setCustomValidity("");
  }

  async function sendData(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      const result = await api.post("/login", data);

      setUser(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
      setAuthorization(result.data.token);

      return navigate("/");
    } catch (err) {
      if (err.status === 401) {
        setError("Username or password is incorrect.");
      } else {
        setError("There was a problem, please try again later.");
      }
    }
  }

  return (
    <>
      <Header>
        <h1>Log In</h1>
      </Header>
      <main>
        <form onSubmit={sendData}>
          {error ? <p className="error-message">{error}</p> : null}
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" id="email" required />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              onInput={checkPasswordLength}
              type="password"
              name="password"
              id="password"
              required
            />
          </div>

          <button type="submit">Send</button>
        </form>
      </main>
    </>
  );
}
