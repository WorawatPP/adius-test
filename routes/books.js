const router = require("express").Router();
const Book = require("../model/Books");
const { addBookValidation } = require("../validBook");

router.post("/add", async (req, res) => {
  const { error } = addBookValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book({
    title: req.body.title,
    desc: req.body.desc,
    amount: req.body.amount,
  });
  try {
    const savedBook = await book.save();
    res.send(savedBook);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
