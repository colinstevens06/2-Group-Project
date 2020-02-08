const express = require("express");
const router = express.Router();
const { matching: ctrlr } = require("../controllers");

router.get("/",ctrlr.get.status);
router.get(/^\/l(eaderboard|b)$/i, ctrlr.get.leaderboard);

module.exports = router;
