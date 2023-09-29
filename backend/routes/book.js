import express from "express";
const router = express.Router();
import { Book } from "../models/book.js";
// post books
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear || !req.body.imgUrl || !req.body.description) {
      return res.status(400).send({
        message: "Send all required fields: title , author , publishYear and book image",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      imgUrl: req.body.imgUrl,
      description: req.body.description,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// get books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).send({
      count: books.length,
      books,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
// get books by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(201).send(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});
//update book
router.put("/:id", async (req, res) => {
  try { 
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.publishYear ||
      !req.body.imgUrl ||
      !req.body.description
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: title , author , publishYear and book image",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send("No such book found");
    }
    return res.status(201).send(`Book Updated successfully`);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
// delete book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findOneAndDelete(id);
    if (!result) {
      return res.status(404).send("No such book found");
    }
    return res.status(201).send(`Book deleted successfully`);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
export default router;