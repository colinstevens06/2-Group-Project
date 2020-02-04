const express = require("express");
const router = express.Router();
const { matching: ctrlr } = require("../controllers");

router.route("/").get(ctrlr.get.status);

module.exports = router;
