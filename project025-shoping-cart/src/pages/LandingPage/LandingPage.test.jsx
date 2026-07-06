import { createRoutesStub } from "react-router";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MockCartContextProvider } from "../../../tests/mockProviders.jsx";
import LandingPage from "./LandingPage.jsx";
import ProductsPage from "/src/pages/ProductsPage/ProductsPage.jsx";
import AppLayout from "../AppLayout/AppLayout.jsx";

const Stub = createRoutesStub([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    Component: MockCartContextProvider,
    children: [
      {
        element: AppLayout,
        children: [
          {
            path: "/products/:category?",
            Component: ProductsPage,
          },
        ],
      },
    ],
  },
]);

describe("home page tests", [
  it("clicking the buy men's clothing redirect to men's products page", async () => {
    const user = userEvent.setup();

    render(<Stub initialEntries={["/"]} />);

    await user.click(screen.getByRole("link", { name: "Buy Men's Clothing" }));

    expect(
      screen.getByRole("heading", { name: "Blue Jacket" }),
    ).toBeInTheDocument();
  }),
  it("clicking the buy women's clothing redirect to women's products page", async () => {
    const user = userEvent.setup();

    render(<Stub initialEntries={["/"]} />);

    await user.click(
      screen.getByRole("link", { name: "Buy Women's Clothing" }),
    );

    expect(
      screen.getByRole("heading", { name: "Pink Dress" }),
    ).toBeInTheDocument();
  }),
]);
