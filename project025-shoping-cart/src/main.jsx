import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import "./rest.css";
import "./index.module.css";
import { routes } from "./routes";
import { CartContextProvidor } from "./providers";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartContextProvidor>
      <RouterProvider router={router} />
    </CartContextProvidor>
  </StrictMode>,
);
