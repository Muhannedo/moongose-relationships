/*------------------------------ Starter Code ------------------------------*/

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Todo = require("./models/todo.js");
// to connect the database
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");
  await runQueries();

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
  process.exit();
};

connect();

/*----------------------------- Query Functions -----------------------------*/

const createTodo = async () => {
  const todoData = {
    text: "learn React",
    isComplete: false,
  };
  const todo = await Todo.create(todoData);
  console.log("New todo:", todo);
};

const findTodos = async () => {
  const todos = await Todo.findb({});
  console.log("All todos:", todos);
};
// create a subtask
const createSubTask = async () => {
  const todoId = "6715f76deb60053d4afae9cd";
  const todo = await Todo.findById(todoId);

  const subtaskData = {
    test: " learn how props work",
    isComplete: true,
  };

  const subtask = todo.subtasks.push(subtaskData);
  await todo.save();
  console.log("Modified todo", todo);
};

// show - find one subtask
const findSubtask = async () => {
  const todoId = "6715f76deb60053d4afae9cd";
  const subTaskId = "6715fed59365d10999f0bd88";

  const todo = await Todo.findById(todoId);
  const subTask = todo.subtasks.id(subTaskId);

  console.log('Subdocument:', subTask);
};

//remove subtask

const removeSubtask = async ()=>{
    const todoId = "6715f76deb60053d4afae9cd";
    const subTaskId = "6715fed59365d10999f0bd88";

    const todo = await Todo.findById(todoId);
    todo.subtasks.pull(subTaskId);
    await todo.save();

    console.log('Updated documents' , todo);
}
//todo id = 6715f76deb60053d4afae9cd
// subtask id = 6715fed59365d10999f0bd88
/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log("Queries running.");
  // create a todo
  //   await createTodo();
  // create a sub task
  //   await createSubTask();
  //find subtask by id
//   await findSubtask();
// updated or modify the subtask
await removeSubtask();
};
