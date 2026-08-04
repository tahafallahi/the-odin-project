import { Link, useLocation } from "react-router";

import { useContext } from "react";
import { UserContext } from "../../contexts.jsx";

import globalStyles from "../../globals.module.css";
import styles from "./Header.module.css";
import { removeAuthorizationHeader } from "../../api.js";

export default function Header({ children }) {
  const [user, setUser] = useContext(UserContext);
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("user");
    removeAuthorizationHeader();
    setUser(null);
  }

  return (
    <header>
      <div className={styles.nav}>
        {location.pathname !== "/" ? (
          <Link to="/">Home</Link>
        ) : user && user.role == "ADMIN" ? (
          <Link to="/posts/create">Create Post</Link>
        ) : (
          <div></div>
        )}
        <div className={styles.authNav}>
          {!user ? (
            <>
              <Link to="/register">Sign up</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <p>{user.name}</p>
              <button
                className={globalStyles.linkButton}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {children}
    </header>
  );
}
