const pool = require("./pool.js");
const { DataBaseError } = require("../errors.js");

async function createItem(item) {
  if (item.category) {
    // Gets the category if it exist, if not creates it
    let { rows: categoryRows } = await getCategoryByName(item.category);

    if (categoryRows.length == 0) {
      console.log(categoryRows);
      const categoryObject = await createCategory({ name: item.category });
      categoryRows = categoryObject.rows;
    }
    const SQL = `
        INSERT INTO items (name, stock, price, category_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        ;`;

    return await pool.query(SQL, [
      item.name,
      item.stock,
      item.price,
      categoryRows[0].id,
    ]);
  } else {
    const SQL = `
        INSERT INTO items (name, stock, price)
        VALUES ($1, $2, $3)
        RETURNING *
        ;`;

    return await pool.query(SQL, [item.name, item.stock, item.price]);
  }
}

async function getAllItems() {
  const SQL = `
          SELECT i.id, i.name, i.stock, i.price, c.name AS category_name FROM items AS i
          LEFT JOIN categories AS c ON i.category_id = c.id;
      `;

  return await pool.query(SQL);
}

async function getItemByName(name) {
  const SQL = `
          SELECT * FROM items WHERE name = $1;
      `;

  return await pool.query(SQL, [name]);
}

async function getItemByID(id) {
  const SQL = `
          SELECT i.id, i.name, i.stock, i.price, c.name AS category_name FROM items AS i
          LEFT JOIN categories AS c
          ON i.category_id = c.id
          WHERE i.id = $1;
      `;

  return await pool.query(SQL, [id]);
}

async function updateItem(id, item) {
  if (item.category) {
    // Gets the category if it exist, if not creates it
    let { rows: categoryRows } = await getCategoryByName(item.category);

    if (categoryRows.length == 0) {
      console.log(categoryRows);
      const categoryObject = await createCategory({ name: item.category });
      categoryRows = categoryObject.rows;
    }
    const SQL = `
        UPDATE items 
        SET (name, stock, price, category_id) = ($2, $3, $4, $5)
        WHERE id = $1
        RETURNING *;
        `;

    return await pool.query(SQL, [
      id,
      item.name,
      item.stock,
      item.price,
      categoryRows[0].id,
    ]);
  } else {
    const SQL = `
        UPDATE items 
        SET (name, stock, price) = ($2, $3, $4)
        WHERE id = $1
        RETURNING *;
        `;

    return await pool.query(SQL, [id, item.name, item.stock, item.price]);
  }
}

async function createCategory(category) {
  const SQL = `
        INSERT INTO categories (name)
        VALUES ($1) 
				RETURNING *
          ;`;

  try {
    return await pool.query(SQL, [category.name]);
  } catch (err) {
    // 23505 is the postgres error code for unique value violation
    if (err.code == 23505) {
      throw new DataBaseError("Category name must be unique.");
    } else {
      throw err;
    }
  }
}

async function getAllCategories() {
  const SQL = `
          SELECT * FROM categories ;
        `;

  return await pool.query(SQL);
}

async function getCategoryByName(name) {
  const SQL = `
          SELECT * FROM categories WHERE name = $1;
      `;

  return await pool.query(SQL, [name]);
}

async function deleteItem(id) {
  const SQL = `
          DELETE FROM items WHERE id = $1;
      `;

  await pool.query(SQL, [id]);
}

module.exports = {
  createItem,
  getAllItems,
  getItemByName,
  getItemByID,
  updateItem,
  createCategory,
  getAllCategories,
  getCategoryByName,
  deleteItem,
};
