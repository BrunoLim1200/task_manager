const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");

const bodyParser = require("body-parser");

// Load in the mongoose models
const { List, Task } = require("./db/models");

// Load middleware
app.use(bodyParser.json());

//List Routes
app.get("/lists", (req, res) => {
  // We want to return an array of all the lists in the database
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

app.post("/lists", (req, res) => {
  // We want to create a new list and return a new list document back to the user
  let title = req.body.title;

  let newList = new List({
    title,
  });
  newList.save().then((listDoc) => {
    // the full list doscument is returned *incl. id
    res.send(listDoc);
  });
});

app.patch("/lists/:id", (req, res) => {
  // we want to update the specified list with the new value
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/lists/:id", (req, res) => {
  // we want to delete the specified list
  List.findOneAndDelete({
    _id: req.params.id,
  }).then((removeListDoc) => {
    res.send(removeListDoc);
  });
});

/* Working with tasks */

app.get("/lists/:listId/tasks", (req, res) => {
  //we want to return all tasks that belong to a specific list
  Task.find({
    _listId: req.params.listId,
  }).then((tasks) => {
    res.send(tasks);
  });
});

app.get("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findOne({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((task) => {
    res.send(task);
  });
});

app.post("/lists/:listId/tasks", (req, res) => {
  // we want to create a new taks in the list specified by listId
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId,
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  });
});

app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  //We want to update an existing taks in the list specified by taskId
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      _listId: req.params.listId,
    },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  //We want to delete an existing task in the list specified by taskId
  Task.findOneAndDelete({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((removeTaskDoc) => {
    res.send(removeTaskDoc);
  });
});

const port = 4500;
app.listen(port, () => {
  console.log("Server is listen on port", port);
});
