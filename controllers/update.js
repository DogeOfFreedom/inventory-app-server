const mongoose = require("mongoose");
const Item = require("../models/item");
const Category = require("../models/category");
const { validationResult } = require("express-validator");

const updateItem = async (req, res) => {
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
    let updatedDoc = {
      id,
      name,
      description,
      category,
      price,
      quantityInStock,
    };
    if (imgURL !== undefined) {
      updatedDoc = { ...updatedDoc, imgURL };
    }

    try {
      await Item.updateOne({ _id: id }, updatedDoc);
      res.json({ message: "Update Success", completed: true });
    } catch (e) {
      res.json({ message: e.message });
    }
  }
};

const updateCategory = (req, res) => {
  // Extract validation errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
  } else {
    console.log("update");
  }

  res.sendStatus(200);
};

module.exports = { updateItem, updateCategory };
