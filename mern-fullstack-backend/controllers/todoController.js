const todoModel = require("../models/todoModel");
const getTodos = async (req, res) => {
  return res.send(await todoModel.find({}));
};
const createTodo = async (req, res) => {
  let { text, status } = req.body;
  let todo = new todoModel({
    text,
    status,
    createDate: new Date(),
  });
  await todo.save();
  return res.send(todo);
};
const updateTodo = async (req, res) => {
  const { _id, status, text } = req.body;
  const todo = await todoModel.findOne({ _id });
  todo.status = status;
  todo.text = text;
  await todo.save();
  return res.send("Todo updated!");
};
const deleteTodo = async (req, res) => {
  const { _id } = req.body;
  await todoModel.deleteOne({ _id });
  return res.send("Todo deleted!");
};
module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
