const express = require("express");
const router = express.Router();

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  clearCompleted,
} = require("../controllers/todoController");

router.route("/").get(getTodos).post(createTodo);

// Must be registered before "/:id" so "completed" isn't treated as an id
router.delete("/completed", clearCompleted);

router.route("/:id").patch(updateTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
