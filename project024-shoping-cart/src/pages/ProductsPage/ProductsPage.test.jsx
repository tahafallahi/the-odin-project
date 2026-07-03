import { it, describe, expect } from "vitest";
import { createRoutesStub } from "react-router";

import { CartContextProvidor } from "../../providers.jsx";
import ProductsPage from "./ProductsPage.jsx";
import { getAllByRole, render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "../../../tests/setup.js";
import userEvent from "@testing-library/user-event";
import AppLayout from "../AppLayout/AppLayout.jsx";

const Stub = createRoutesStub([
  {
    Component: AppLayout,
    children: [
      {
        path: "/products/:category?",
        Component: ProductsPage,
      },
    ],
  },
]);

describe("products page tests, loading products", [
  it("shows loading cards before the request finishes", async () => {
    render(
      <CartContextProvidor>
        <Stub initialEntries={["/products"]} />
      </CartContextProvidor>,
    );
    expect(screen.getAllByText("Loading").length).toBeGreaterThan(0);
  }),

  it("shows error if request failes", async () => {
    server.use(
      http.get("https://fakestoreapi.com/products", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    render(
      <CartContextProvidor>
        <Stub initialEntries={["/products"]} />
      </CartContextProvidor>,
    );
    expect(await screen.findByText(/An error occured./)).toBeInTheDocument();
  }),

  it("/products/ shows every product", async () => {
    render(
      <CartContextProvidor>
        <Stub initialEntries={["/products"]} />
      </CartContextProvidor>,
    );

    await screen.findAllByText("Blue Jacket");
    const products = await screen.findAllByRole("article");

    expect(products.length).toBe(4);
  }),

  it("/products/men's clothing shows only men's clothing", async () => {
    render(
      <CartContextProvidor>
        <Stub initialEntries={["/products/men's clothing"]} />
      </CartContextProvidor>,
    );

    await screen.findAllByText("Blue Jacket");
    const products = await screen.findAllByRole("article");

    expect(products.length).toBe(2);
  }),

  it("/products/women's clothing shows only men's clothing", async () => {
    render(
      <CartContextProvidor>
        <Stub initialEntries={["/products/women's clothing"]} />
      </CartContextProvidor>,
    );

    await screen.findAllByText("Pink Dress");
    const products = await screen.findAllByRole("article");

    expect(products.length).toBe(2);
  }),
]);

describe("products page tests, product interactions", [
  it("cliking add to cart button, adds the 1 product to cart", async () => {
    const user = userEvent.setup();
    render(
      <CartContextProvidor>
        <Stub initialEntries={["/products"]} />
      </CartContextProvidor>,
    );

    await screen.findByText("Blue Jacket");

    await user.click(screen.getAllByRole("button", { name: "Add To Cart" })[0]);

    expect(Number(screen.getByTestId("counter").textContent)).toBe(1);
  }),

  it("clicking add to cart button on same product, adds the 2 product to cart", async () => {
    const user = userEvent.setup();
    render(
      <CartContextProvidor>
        <Stub initialEntries={["/products"]} />
      </CartContextProvidor>,
    );

    await screen.findByText("Blue Jacket");

    await user.click(screen.getAllByRole("button", { name: "Add To Cart" })[0]);
    await user.click(screen.getAllByRole("button", { name: "Add To Cart" })[0]);

    expect(Number(screen.getByTestId("counter").textContent)).toBe(2);
  }),

  it("clicking add to cart button on 2 product, adds the 2 product to cart", async () => {
    const user = userEvent.setup();
    render(
      <CartContextProvidor>
        <Stub initialEntries={["/products"]} />
      </CartContextProvidor>,
    );

    await screen.findByText("Blue Jacket");

    await user.click(screen.getAllByRole("button", { name: "Add To Cart" })[0]);
    await user.click(screen.getAllByRole("button", { name: "Add To Cart" })[1]);

    expect(Number(screen.getByTestId("counter").textContent)).toBe(2);
  }),

  it("clicking add to cart button on a product after changing numbers to buy to 2, adds the 2 product to cart", async () => {
    const user = userEvent.setup();
    render(
      <CartContextProvidor>
        <Stub initialEntries={["/products"]} />
      </CartContextProvidor>,
    );

    await screen.findByText("Blue Jacket");

    await user.clear(screen.getAllByRole("spinbutton")[0]);
    await user.type(screen.getAllByRole("spinbutton")[0], "2");
    await user.click(screen.getAllByRole("button", { name: "Add To Cart" })[0]);

    expect(Number(screen.getByTestId("counter").textContent)).toBe(2);
  }),
]);
