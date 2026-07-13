const { body, matchedData, validationResult } = require("express-validator");
const db = require("../db/queries.js");

const itemVaildators = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("item name can't be empty")
    .isLength({ max: 100 })
    .withMessage("item name must be less then 100 charachters"),
  body("category")
    .trim()
    .isString()
    .isLength({ max: 100 })
    .withMessage("category name must be less then 100 charachters"),
  body("stock").isInt({ min: 0 }).withMessage("stock must be 0 or more"),
  body("price").isInt({ min: 0 }).withMessage("price must be 0 or more"),
];

const createItem = [
  itemVaildators,
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await db.createItem(matchedData(req, { includeOptionals: true }));
      res.redirect("/item");
    } else {
      res.status(400).send(errors);
    }
  },
];

async function getItem(req, res) {
  if (!req.query.id) {
    res.status(400).send("Error: no id query was provided");
  } else {
    const { rows } = await db.getItemByID(req.query.id);
    res.render("view-item", { item: rows[0] });
  }
}

async function getAllItems(req, res) {
  const { rows } = await db.getAllItems();
  rows.sort((a, b) => a.id - b.id);
  res.render("all-items", { items: rows });
}

async function getItemCreateForm(req, res) {
  const { rows } = await db.getAllCategories();
  res.render("create-item-form", { categoires: rows });
}

async function getItemUpdateForm(req, res) {
  if (!req.query.id) {
    res.status(400).send("Error: no id query was provided");
  } else {
    const { rows: categoryRow } = await db.getAllCategories();
    const { rows: itemRows } = await db.getItemByID(req.query.id);
    res.render("update-item-form", {
      categoires: categoryRow,
      item: itemRows[0],
    });
  }
}

const updateItem = [
  itemVaildators,
  async (req, res) => {
    if (!req.query.id) {
      res.status(400).send("Error: no id query was provided");
    } else {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        console.log(
          await db.updateItem(
            req.query.id,
            matchedData(req, { includeOptionals: true }),
          ),
        );
        res.redirect(`/item/view?id=${req.query.id}`);
      } else {
        res.status(400).send(errors);
      }
    }
  },
];

async function getDeleteConfirmation(req, res) {
  if (!req.query.id) {
    res.status(400).send("Error: no id query was provided");
  } else {
    const { rows } = await db.getItemByID(req.query.id);
    res.render("delete-confirmation", { item: rows[0] });
  }
}

async function deleteItem(req, res) {
  if (!req.body.id) {
    res.status(400).send("Error: no id was provided");
  } else {
    await db.deleteItem(req.body.id);
    res.redirect("/item");
  }
}

module.exports = {
  createItem,
  getItem,
  getAllItems,
  getItemCreateForm,
  getItemUpdateForm,
  updateItem,
  getDeleteConfirmation,
  deleteItem,
};
