// This will handle connection login to the MongoDB database.

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/TaskManager?authSource=admin", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((e) => {
    console.log("Error connecting to MongoDB", e);
  });

//to prevent depreciation warnings (from mongoDB)
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = {
  mongoose,
};
