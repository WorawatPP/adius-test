const router = require("express").Router();
const { rentBook } = require("../model/Books");

router.get("/", async (req, res) => {
  const getLog = await rentBook.find();
  res.json(getLog);
});

module.exports = router;
