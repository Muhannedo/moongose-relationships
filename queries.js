/*------------------------------ Starter Code ------------------------------*/

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const Todo = require("./models/todo.js");
const User  = require('./models/user.js')
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
    const todos = await Todo.find({}).populate("assignee");
    console.log("All todos:", todos);
};
// create a subtask
const createSubTask = async () => {
  const todoId = "67160bc532f070dfe8fd5d77";
  const todo = await Todo.findById(todoId);

  const subtaskData = {
    text: "RUN FOR YOUR LIFE",
    isComplete: false,
  };

  const subtask = todo.subtasks.push(subtaskData);
  await todo.save();
  console.log("Modified todo", todo);
};

// show - find one subtask
const findSubtask = async () => {
  const todoId = "67160bc532f070dfe8fd5d77";
  const subTaskId = "67160bedb8108f0fdbba2478";

  const todo = await Todo.findById(todoId);
  const subTask = todo.subtasks.id(subTaskId);

  console.log('Subdocument:', subTask);
};

//remove subtask

const removeSubtask = async ()=>{
    const todoId = "67160bc532f070dfe8fd5d77";
    const subTaskId = "67160bedb8108f0fdbba2478";

    const todo = await Todo.findById(todoId);
    todo.subtasks.pull(subTaskId);
    await todo.save();

    console.log('Updated documents' , todo);
};

const updateSubtask = async ()=>{
    const todoId = "67160bc532f070dfe8fd5d77";
    const subTaskId = "67160bedb8108f0fdbba2478";

    const todo = await Todo.findById(todoId);
    const subtask = todo.subtasks.id(subTaskId);
// modify the isComplete for the subtask
    subtask.isComplete=true;
    await todo.save();
    console.log('Updated document:', todo);
};

const findParentAndRemoveSubtask = async ()=>{
    const todo = await Todo.findOne({
        'subtasks.text': " Learn how props work"
      });

    // console.log('todo' , todo);

    const subtask = todo.subtasks.find((subTask) => {
        return subTask.text === ' Learn how props work'
      });

    //   console.log('subtask' , subtask);
      subtask.deleteOne();
      await todo.save();
      console.log('Updated todo:', todo);
}

const createUser = async ()=>{
    const userData = {
        name: 'Muhannad',
        email:'muhannedov@gmail.com'
    }

    const user = await User.create(userData);
    console.log('new User', user);


};
const assignTodo = async ()=>{
    const todoId='67160bc532f070dfe8fd5d77';
    const userId='671628863ee6b72a684f309f';

    const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        { assignee: userId },
        { new: true }
      );
      console.log('Updated document:', updatedTodo);
};
//todo id = 67160bc532f070dfe8fd5d77
// subtask 67160bedb8108f0fdbba2478
// ---------------------------------------
// user ID= 671628863ee6b72a684f309f

/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log("Queries running.");
  // create a todo
    // await createTodo();
  // create a sub task
    // await createSubTask();
  //find subtask by id
//   await findSubtask();
// remove the subtask
// await removeSubtask();
// update the subtask
//  await updateSubtask();
// await findParentAndRemoveSubtask();
//find task
await findTodos();
// create a user
// await createUser();
// update the user assignee
// await assignTodo();


};
