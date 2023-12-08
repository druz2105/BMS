import Joi from "joi";
import {BookCreateInterface} from "@lib/interfaces/books/bookModel";

export const CreateBookSchema = Joi.object<BookCreateInterface>({
  title: Joi.string().required(),
  image: Joi.string().required(),
  author: Joi.string().required(),
  genre: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(1).required(),
  stock: Joi.number().min(0).required(),
}).unknown(false);

export const PatchBookValidator = Joi.object<BookCreateInterface>({
  title: Joi.string(),
  image: Joi.string(),
  author: Joi.string(),
  genre: Joi.string(),
  description: Joi.string(),
  price: Joi.number().min(1),
  stock: Joi.number().min(0),
}).unknown(false);
