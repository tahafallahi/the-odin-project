import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { CartContextProvidor } from "../../providers";
import ProductCard from "./ProductCard";
import userEvent from "@testing-library/user-event";

const product = {
  id: 1,
  title: "Blue Jacket",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

describe("products card tests", [
  it("shows the product", () => {
    render(
      <CartContextProvidor>
        <ProductCard product={product} />
      </CartContextProvidor>,
    );

    expect(
      screen.getByRole("heading", { name: "Blue Jacket" }),
    ).toBeInTheDocument();
  }),
]);
