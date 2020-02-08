const express = require("express");
const router = express.Router();
const {
  auth: { requireToken }
} = require("../middleware");
const { user: ctrlr } = require("../controllers");

router.get("/:uid", requireToken, ctrlr.get.one);

module.exports = router;
