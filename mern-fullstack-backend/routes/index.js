const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");
//user routes
router.get("/todos", getTodos);
router.post("/todos", createTodo);
router.put("/todos", updateTodo);
router.delete("/todos", deleteTodo);
module.exports = router;
