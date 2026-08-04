import { useEffect, useState } from "react";
import { UserContext } from "./contexts";
import { api, setAuthorization, removeAuthorizationHeader } from "./api.js";

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    let userInStorage = JSON.parse(localStorage.getItem("user"));
    if (userInStorage && userInStorage.exp <= Date.now() / 1000) {
      userInStorage = null;
    }
    return userInStorage;
  });

  useEffect(() => {
    if (user) {
      setAuthorization(user.token);
    } else {
      removeAuthorizationHeader();
    }
  }, [user]);

  return <UserContext value={[user, setUser]}>{children}</UserContext>;
}
