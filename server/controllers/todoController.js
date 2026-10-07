const Todo = require("../models/Todo");

// Only these fields can be set by the client
const pickFields = (body) => {
  const allowed = ["title", "completed", "priority", "dueDate"];
  return Object.fromEntries(
    Object.entries(body || {}).filter(([key]) => allowed.includes(key))
  );
};

// @route  GET /api/todos
const getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: todos.length,
    data: todos,
  });
};

// @route  POST /api/todos
const createTodo = async (req, res) => {
  const todo = await Todo.create(pickFields(req.body));

  res.status(201).json({
    success: true,
    message: "Todo created successfully",
    data: todo,
  });
};

// @route  PATCH /api/todos/:id
const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, pickFields(req.body), {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Todo updated successfully",
    data: todo,
  });
};

// @route  DELETE /api/todos/:id
const deleteTodo = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
    data: todo,
  });
};

// @route  DELETE /api/todos/completed
const clearCompleted = async (req, res) => {
  const result = await Todo.deleteMany({ completed: true });

  res.status(200).json({
    success: true,
    message: `${result.deletedCount} completed todo(s) removed`,
    deletedCount: result.deletedCount,
  });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  clearCompleted,
};
