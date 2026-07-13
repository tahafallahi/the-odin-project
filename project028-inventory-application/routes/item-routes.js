const { Router } = require("express");
const {
  createItem,
  getItem,
  getAllItems,
  getItemCreateForm,
  getItemUpdateForm,
  updateItem,
  getDeleteConfirmation,
  deleteItem,
} = require("../controllers/itemsControllers.js");

const router = Router();

router.get("/", getAllItems);
router.get("/create", getItemCreateForm);
router.post("/create", createItem);
router.get("/view", getItem);
router.get("/update", getItemUpdateForm);
router.post("/update", updateItem);
router.get("/delete", getDeleteConfirmation);
router.post("/delete", deleteItem);

module.exports = router;
