const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { populate, deleteDB } = require("../controllers/populate");
const { createItem, createCategory } = require("../controllers/create");
const Item = require("../models/item");
const Category = require("../models/category");
const { updateItem, updateCategory } = require("../controllers/update");
const { body } = require("express-validator");

// Get name of categories
router.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const categories = await Category.find({}, { name: 1 });
    res.json(JSON.stringify(categories));
  })
);

// Get all items
router.get(
  "/items",
  asyncHandler(async (req, res) => {
    const items = await Item.find();
    res.json(JSON.stringify(items));
  })
);

// Get all items from a specific category
router.get(
  "/:category/items",
  asyncHandler(async (req, res) => {
    const { chosenCategory } = req.params;
    const items = await Item.find({ category: chosenCategory });
    res.json(JSON.stringify(items));
  })
);

// Get details of a specific item
router.get(
  "/item/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const itemData = await Item.findById(id);
    res.json(JSON.stringify(itemData));
  })
);

// Create
router.post("/create_category", createCategory);

router.post(
  "/create_item",
  body("name", "Item name must be atleast 3 characters")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .escape(),
  body("description").trim().escape(),
  body("category").trim().escape(),
  body("price", "Price cannot be negative").isInt({ gt: 0 }),
  body("quantityInStock", "Quantity must be more than 0").isInt({ gt: 0 }),
  createItem
);

// Update
router.put("/category/:id/update", updateCategory);

router.put(
  "/item/:id/update",
  body("name", "Name must be atleast 3 characters")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .escape(),
  body("description").trim().escape(),
  body("category").trim().escape(),
  body("price", "Price cannot be negative").isFloat({ gt: 0 }).toFloat(),
  body("quantityInStock", "Quantity cannot be negative")
    .isFloat({ gt: -1 })
    .toFloat(),
  updateItem
);

// Delete
router.delete(
  "/item/:id/delete",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Item.deleteOne({ _id: id });
    res.json({
      message: "Item Deleted",
    });
  })
);

router.delete(
  "/:categoryId/delete",
  asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    await Category.deleteOne({ _id: categoryId });
    res.json({
      message: "Category Deleted",
    });
  })
);

// Populate - dev only
if (process.env.ENV === "development") {
  router.post("/populate_db", deleteDB, populate);
}

router.post("/populate_db", deleteDB, populate);

module.exports = router;
