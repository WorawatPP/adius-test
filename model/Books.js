const mongoose = require("mongoose");

const bookShcema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const rentSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      // required: true,
    },
    bookTitle: {
      type: String,
      // required: true,
    },
    userId: {
      type: String,
      // requiure: true,
    },
    rentAmount: {
      type: Number,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
    },
    rentDate: {
      type: Date,
      // default: Date.now,
    },
    returnAt: {
      type: Date,
    },
  },
  { versionKey: false }
);

const Books = mongoose.model("Books", bookShcema);
const rentBook = mongoose.model("rentBook", rentSchema);

module.exports = { rentBook: rentBook, Book: Books };
