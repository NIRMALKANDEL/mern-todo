const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos, updateTodo,
} = require("../controllers/todoController");

router.post("/", createTodo);

router.get("/", getTodos);

router.put("/:id", updateTodo);
module.exports = router;