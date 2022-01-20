const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const bookRoute = require("./routes/books");

mongoose.connect(
  "mongodb://localhost:27017/adius-test",
  {
    useNewUrlParser: true,
  },
  () => console.log("Connect to DB")
);

app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/book", bookRoute);

app.listen(9000, () => {
  console.log("Running in port 9000");
});
