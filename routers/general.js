const { populate, deleteDB } = require("../controllers/populate");

const router = require("express").Router();

router.get("/:category/:item_id", (req, res) => {});

router.get("/:category", (req, res) => {});

if (process.env.ENV === "development") {
  router.post("/populate_db", populate);
}

router.post("/populate_db", deleteDB, populate);

module.exports = router;
