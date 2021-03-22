// This file will handle connection th the MongoDB

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/TaskManager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB sucessfully");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB");
    console.log(err);
  });

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = {
  mongoose,
};
