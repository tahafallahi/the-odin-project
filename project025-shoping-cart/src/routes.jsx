import AppLayout from "./pages/AppLayout/AppLayout";
import LandingPage from "/src/pages/LandingPage/LandingPage.jsx";
import ProductsPage from "/src/pages/ProductsPage/ProductsPage.jsx";
import CartPage from "/src/pages/CartPage/CartPage.jsx";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/products/:category?",
        element: <ProductsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
];
