const router = require("express").Router();
const { Book, rentBook } = require("../model/Books");
const { addBookValidation } = require("../validBook");
const verify = require("./verifyToken");

router.get("/", verify, async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.get("/:id", verify, async (req, res) => {
  const { id } = req.params;
  const books = await Book.findById(id);
  res.json(books);
});

router.post("/add", verify, async (req, res) => {
  const { error } = addBookValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = new Book({
    title: req.body.title,
    desc: req.body.desc,
    amount: req.body.amount,
    // userid: req.user._id,
  });
  try {
    // console.log(userId);
    const savedBook = await book.save();
    res.send(savedBook);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/rent/:id", verify, async (req, res) => {
  const { id } = req.params;
  const books = await Book.findById(id);
  if (books.amount > 1) {
    const rent = new rentBook({
      bookId: id,
      bookTitle: books.title,
      userId: req.user._id,
      rentAmount: req.body.rentAmount,
    });
    try {
      //   const rentBook = await rent.save();
      res.send(rent);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).send("Book is not rent");
  }
});

module.exports = router;
