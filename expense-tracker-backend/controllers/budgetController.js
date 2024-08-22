const Budget = require("../models/Budget");

const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.json(budgets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const addBudget = async (req, res) => {
  const { category, amount } = req.body;

  try {
    const newBudget = new Budget({
      category,
      amount,
      user: req.user.id,
    });

    const budget = await newBudget.save();
    res.json(budget);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const updateBudget = async (req, res) => {
  const { category, amount } = req.body;

  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ msg: "Budget not found" });
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    budget = await Budget.findByIdAndUpdate(
      req.params.id,
      { $set: { category, amount } },
      { new: true }
    );

    res.json(budget);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const deleteBudget = async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ msg: "Budget not found" });
    }

    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Budget.findByIdAndRemove(req.params.id);
    res.json({ msg: "Budget removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getBudgets, addBudget, updateBudget, deleteBudget };
