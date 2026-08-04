import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./reset.css";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage.jsx";

import { RouterProvider, createBrowserRouter } from "react-router";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/Auth/LoginPage/LoginPage.jsx";
import PostPage from "./pages/Post/PostPage/PostPage.jsx";
import { UserContextProvider } from "./proiders.jsx";

import CreatePost from "./pages/Post/CreatePost/CreatePost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/post/:id",
    Component: PostPage,
  },
  {
    path: "/posts/create",
    Component: CreatePost,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>,
);
