const express = require("express");
const app = express();
const router = require("./routes");
const mongoose = require("mongoose");
// mongoose config
mongoose.connect("mongodb://localhost/todos", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });  
app.use(express.json());
app.use("/", router);
app.listen(3001, () => {
  console.log(`Listening on port ${3001}`);
});
