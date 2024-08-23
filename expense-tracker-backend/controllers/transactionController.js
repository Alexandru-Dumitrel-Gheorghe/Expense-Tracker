const Transaction = require("../models/Transaction");

// Obținerea tuturor tranzacțiilor pentru un utilizator
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Adăugarea unei noi tranzacții
const addTransaction = async (req, res) => {
  const { title, amount, category, type } = req.body;

  try {
    const newTransaction = new Transaction({
      title,
      amount,
      category,
      type,
      user: req.user.id,
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Actualizarea unei tranzacții
const updateTransaction = async (req, res) => {
  const { title, amount, category, type } = req.body;

  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: { title, amount, category, type } },
      { new: true }
    );

    res.json(transaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Ștergerea unei tranzacții
const deleteTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Transaction.findByIdAndRemove(req.params.id);
    res.json({ msg: "Transaction removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
