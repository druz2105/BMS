import express from "express";
import { jwtDecoder } from "@www/custom.middelewares";
import {
  createNewBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "./api";

export const bookRouter = express.Router();
bookRouter.use(jwtDecoder);
bookRouter.get("/list", getAllBooks);
bookRouter.get("/detail/:id", getBookById);
bookRouter.post("/create", createNewBook);
bookRouter.put("/edit/:id", updateBookById);
bookRouter.delete("/delete/:id", deleteBookById);
