const express = require("express");
const router = express.Router();
const { auth: ctrlr } = require("../controllers");

router.post("/login", ctrlr.post.login);

router.post("/signup", ctrlr.post.signup);

module.exports = router;
