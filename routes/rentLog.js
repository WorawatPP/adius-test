const router = require("express").Router();
const { rentBook } = require("../model/Books");

router.get("/", async (req, res) => {
  const getLog = await rentBook.find();
  res.json(getLog);
});

router.get("/rent", async (req, res) => {
  const getLog = await rentBook.find();
  const string = JSON.stringify(getLog);
  const obj = JSON.parse(string);
  let keys = Object.keys(obj);
  let data = [];
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]].status === "rent") {
      data.push(obj[keys[i]]);
    }
  }
  res.json(data);
});

router.get("/return", async (req, res) => {
  const getLog = await rentBook.find();
  const string = JSON.stringify(getLog);
  const obj = JSON.parse(string);
  let keys = Object.keys(obj);
  let data = [];
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]].status === "return") {
      data.push(obj[keys[i]]);
    }
  }
  res.json(data);
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const getLog = await rentBook.find();
  const string = JSON.stringify(getLog);
  const obj = JSON.parse(string);
  let keys = Object.keys(obj);
  let data = [];
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]].userId === id) {
      data.push(obj[keys[i]]);
    }
  }
  res.json(data);
});

module.exports = router;
