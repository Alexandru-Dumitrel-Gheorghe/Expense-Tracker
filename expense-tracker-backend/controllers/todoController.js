const Todo = require("../models/Todo");

// Obținerea tuturor sarcinilor pentru un utilizator
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).send("Server Error");
  }
};

// Adăugarea unei noi sarcini
const addTodo = async (req, res) => {
  const { text, amount, dueDate } = req.body;

  try {
    const newTodo = new Todo({
      text,
      amount,
      dueDate,
      user: req.user.id,
    });

    const todo = await newTodo.save();
    res.json(todo);
  } catch (error) {
    console.error("Error adding todo:", error.message);
    res.status(500).send("Server Error");
  }
};

// Actualizarea unei sarcini
const updateTodo = async (req, res) => {
  const { text, amount, dueDate, completed } = req.body;

  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: { text, amount, dueDate, completed } },
      { new: true }
    );

    res.json(todo);
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).send("Server Error");
  }
};

// Ștergerea unei sarcini
const deleteTodo = async (req, res) => {
  try {
    let todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Todo.findByIdAndDelete(req.params.id); // Modificat pentru a folosi findByIdAndDelete
    res.json({ msg: "Todo removed" });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getTodos, addTodo, updateTodo, deleteTodo };
