import { describe, it, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { http, HttpResponse } from "msw";

import AppLayout from "../AppLayout/AppLayout";
import CartPage from "./CartPage";
import { MockCartContextProvider } from "../../../tests/mockProviders";
import { server } from "../../../tests/setup";
import userEvent from "@testing-library/user-event";

const Stub = createRoutesStub([
  {
    Component: AppLayout,
    children: [
      {
        path: "/cart",
        Component: CartPage,
      },
    ],
  },
]);

describe("cart page tests, loading products", [
  it("shows loading cards before the request finishes", async () => {
    render(
      <MockCartContextProvider>
        <Stub initialEntries={["/cart"]} />
      </MockCartContextProvider>,
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
      <MockCartContextProvider>
        <Stub initialEntries={["/cart"]} />
      </MockCartContextProvider>,
    );
    expect(await screen.findByText(/An error occured./)).toBeInTheDocument();
  }),

  it("shows the products in the cart", async () => {
    render(
      <MockCartContextProvider>
        <Stub initialEntries={["/cart"]} />
      </MockCartContextProvider>,
    );
    await screen.findByRole("heading", { name: "Pink Dress" });
    expect(screen.getAllByRole("article").length).toBe(2);
  }),
]);

describe("cart page tests, product intractions", [
  it("decreasing the spinbutton lowers product cart counter", async () => {
    const user = userEvent.setup();
    render(
      <MockCartContextProvider>
        <Stub initialEntries={["/cart"]} />
      </MockCartContextProvider>,
    );

    await screen.findByRole("heading", { name: "Pink Dress" });

    await user.type(screen.getAllByRole("spinbutton")[1], "9");

    expect(Number(screen.getByTestId("counter").textContent)).toBe(10);
  }),

  it("increasing the spinbutton increases product cart counter", async () => {
    const user = userEvent.setup();
    render(
      <MockCartContextProvider>
        <Stub initialEntries={["/cart"]} />
      </MockCartContextProvider>,
    );

    await screen.findByRole("heading", { name: "Pink Dress" });

    await user.type(screen.getAllByRole("spinbutton")[1], "11");

    expect(Number(screen.getByTestId("counter").textContent)).toBe(12);
  }),

  it("desceasing every the spinbutton to zero, decrease product cart counter to zero", async () => {
    const user = userEvent.setup();
    render(
      <MockCartContextProvider>
        <Stub initialEntries={["/cart"]} />
      </MockCartContextProvider>,
    );

    await screen.findByRole("heading", { name: "Pink Dress" });

    await user.type(screen.getAllByRole("spinbutton")[0], "0");
    await user.type(screen.getAllByRole("spinbutton")[1], "0");

    expect(Number(screen.getByTestId("counter").textContent)).toBe(0);
  }),
]);
