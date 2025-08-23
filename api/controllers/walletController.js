const Wallet = require("../models/Wallet");

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.params.userId });
    if (!wallet) {
      const created = await Wallet.create({ userId: req.params.userId, balance: 0 });
      return res.json(created);
    }
    return res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateWallet = async (req, res) => {
  try {
    const amount = Number(req.body.amount || 0);
    if (!Number.isFinite(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const wallet = await Wallet.findOneAndUpdate(
      { userId: req.params.userId },
      { $inc: { balance: amount } },
      { new: true, upsert: true }
    );
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
