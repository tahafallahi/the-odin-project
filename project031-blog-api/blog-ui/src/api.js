import axios from "axios";

let authorizationInterceptor = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

function setAuthorization(token) {
  removeAuthorizationHeader();
  authorizationInterceptor = api.interceptors.request.use((config) => {
    config.headers.Authorization = "bearer " + token;
    return config;
  });
}

function removeAuthorizationHeader() {
  if (authorizationInterceptor !== null) {
    api.interceptors.request.eject(authorizationInterceptor);
    authorizationInterceptor = null;
  }
}

export { api, setAuthorization, removeAuthorizationHeader };
