const router = require("express").Router();
const Books = require("../model/Books");
const { Book, rentBook } = require("../model/Books");
const { addBookValidation } = require("../validBook");
const { calculatePrice } = require("../calculatePrice");
const verify = require("./verifyToken");

router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const books = await Book.findById(id);
  res.json(books);
});

router.post("/add", verify, async (req, res) => {
  const isAdmin = req.user.isAdmin;
  if (isAdmin === true) {
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
  } else {
    res.status(400).send("Not Admin");
  }
});

router.post("/rent/:id", verify, async (req, res) => {
  const { id } = req.params;
  const books = await Book.findById(id);
  const deleteAmount = books.amount - req.body.rentAmount;
  const status = "rent";
  if (books.amount > 1) {
    const rent = new rentBook({
      bookId: id,
      bookTitle: books.title,
      userId: req.user._id,
      rentAmount: req.body.rentAmount,
      status: status,
      rentDate: Date.now(),
    });
    try {
      await Book.findByIdAndUpdate(books, { amount: deleteAmount });
      const rentBook = await rent.save();
      res.send(rentBook);
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    res.status(400).send("Book is not rent");
  }
});

router.patch("/return/:id", async (req, res) => {
  const { id } = req.params;
  const getBookId = await rentBook.findById(id);
  const books = await Book.findById(getBookId.bookId);
  const returnAmount = books.amount + getBookId.rentAmount;
  const calDate = calculatePrice(getBookId.rentDate);
  let data = [];
  if (calDate > 3) {
    try {
      let price = 20 * (calDate - 3);
      const returnBook = {
        status: "return",
        returnAt: Date.now(),
        rentAmount: 0,
        price: price,
      };
      await Book.findByIdAndUpdate(books, { amount: returnAmount });
      const returnABook = await rentBook.findByIdAndUpdate(id, {
        $set: returnBook,
      });
      data.push(returnABook);
    } catch (error) {
      res.status(400).send(error);
    }
    res.send(data);
  } else {
    try {
      const returnBook = {
        status: "return",
        returnAt: Date.now(),
        rentAmount: 0,
        price: 0,
      };
      await Book.findByIdAndUpdate(books, { amount: returnAmount });
      const returnABook = await rentBook.findByIdAndUpdate(id, {
        $set: returnBook,
      });
      data.push(returnABook);
    } catch (error) {
      res.status(400).send(error);
    }
    res.send(data);
  }
});

module.exports = router;
