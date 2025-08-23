const express = require("express");
const { getWallet, updateWallet } = require("../controllers/walletController");

const router = express.Router();

router.get("/:userId", getWallet);
router.post("/:userId", updateWallet);

module.exports = router;
