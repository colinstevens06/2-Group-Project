const express = require("express");
const router = express.Router();
const {
  auth: { requireToken }
} = require("../middleware");
const { user: ctrlr } = require("../controllers");

router.get("/", requireToken, ctrlr.get.user);

router.get("/team", requireToken, ctrlr.get.team);

router.put("/team", requireToken, ctrlr.put.team);

module.exports = router;
