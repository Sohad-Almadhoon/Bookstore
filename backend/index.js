import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from './routes/book.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  return res.status(234).send("Hello");
});

app.use("/books", bookRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
