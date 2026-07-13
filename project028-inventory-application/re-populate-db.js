const { createCategory, createItem } = require("./db/queries.js");
const pool = require("./db/pool.js");
const globals = require("./settings.js");

const initialData = {
  categories: [
    { name: "Pre-War Snacks" },
    { name: "Beverages" },
    { name: "Chems & Aid" },
    { name: "Weapons & Ammo" },
  ],
  items: [
    {
      name: "Fancy Lads Snack Cakes",
      stock: 42,
      price: 15,
      category_name: "Pre-War Snacks",
    },
    { name: "Cram", stock: 30, price: 10, category_name: "Pre-War Snacks" },
    {
      name: "Salisbury Steak",
      stock: 25,
      price: 12,
      category_name: "Pre-War Snacks",
    },
    {
      name: "Blamco Mac & Cheese",
      stock: 18,
      price: 8,
      category_name: "Pre-War Snacks",
    },
    {
      name: "Yum Yum Deviled Eggs",
      stock: 20,
      price: 9,
      category_name: "Pre-War Snacks",
    },
    { name: "Nuka-Cola", stock: 60, price: 20, category_name: "Beverages" },
    {
      name: "Nuka-Cola Quantum",
      stock: 15,
      price: 45,
      category_name: "Beverages",
    },
    {
      name: "Sunset Sarsaparilla",
      stock: 35,
      price: 18,
      category_name: "Beverages",
    },
    {
      name: "Purified Water",
      stock: 80,
      price: 10,
      category_name: "Beverages",
    },
    { name: "Dirty Water", stock: 50, price: 3, category_name: "Beverages" },
    { name: "Stimpak", stock: 22, price: 75, category_name: "Chems & Aid" },
    { name: "RadAway", stock: 17, price: 90, category_name: "Chems & Aid" },
    { name: "Buffout", stock: 12, price: 60, category_name: "Chems & Aid" },
    { name: "Mentats", stock: 14, price: 55, category_name: "Chems & Aid" },
    { name: "Psycho", stock: 8, price: 100, category_name: "Chems & Aid" },
    {
      name: "10mm Ammo",
      stock: 200,
      price: 5,
      category_name: "Weapons & Ammo",
    },
    {
      name: ".308 Ammo",
      stock: 90,
      price: 12,
      category_name: "Weapons & Ammo",
    },
    {
      name: "Fusion Cell",
      stock: 40,
      price: 25,
      category_name: "Weapons & Ammo",
    },
    {
      name: "Combat Knife",
      stock: 10,
      price: 150,
      category_name: "Weapons & Ammo",
    },
    {
      name: "Baseball Bat",
      stock: 7,
      price: 80,
      category_name: "Weapons & Ammo",
    },
  ],
};

const SQL = `
    CREATE TABLE IF NOT EXISTS categories (
      id integer PRIMARY KEY GENERATEd ALWAYS AS IDENTITY,
        name varchar(100) NOT NULL UNIQUE
    );
    
    CREATE TABLE IF NOT EXISTS items (
        id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name varchar(100) NOT NULL,
        stock integer CHECK (stock >= 0) DEFAULT 0,
        price integer CHECK (price >= 0),
        category_id integer REFERENCES categories
    );
    
`;

if (globals.NODE_ENV != "development")
  throw new Error("can't repopulate the database in production");

async function main() {
  console.log("dropping tables...");
  await pool.query(`
    DROP TABLE IF EXISTS items;
    DROP TABLE IF EXISTS categories;
  `);

  console.log("seeding...");
  await pool.query(SQL);

  console.log("populating tables with inital data...");
  for (const category of initialData.categories) {
    await createCategory(category);
  }
  for (const item of initialData.items) {
    await createItem(item);
  }

  console.log("done");
}

main();
