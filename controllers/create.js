const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Item = require("../models/item");
const Category = require("../models/category");

const createItem = async (req, res) => {
  // Extract validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Always send back the first error
    const errorMsg = errors.errors[0].msg;
    res.json({
      message: errorMsg,
    });
  } else {
    const { id, name, description, category, price, quantityInStock, imgURL } =
      req.body;
    let newDoc = {
      id,
      name,
      description,
      category,
      price,
      quantityInStock,
    };
    if (imgURL !== undefined) {
      newDoc = { ...newDoc, imgURL };
    }

    try {
      await Item.create(newDoc);
      res.json({ message: "Creation Success", completed: true });
    } catch (e) {
      res.json({ message: e.message });
    }
  }
};

const createCategory = async (req, res) => {
  // Extract validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Always send back the first error
    const errorMsg = errors.errors[0].msg;
    res.json({
      message: errorMsg,
    });
  } else {
    const { id, name } = req.body;
    const newDoc = {
      id,
      name: name.toLowerCase(),
    };

    try {
      // Check if category name already exists
      console.log(name);
      const exists = await Category.exists({ name });
      if (exists) {
        res.json({ message: "Category already exists" });
      } else {
        await Category.create(newDoc);
        res.json({ message: "Creation Success", completed: true });
      }
    } catch (e) {
      res.json({ message: e.message });
    }
  }
};

module.exports = { createItem, createCategory };
