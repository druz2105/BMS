import mongoose from "mongoose";
import { BookModelInterface } from "@lib/interfaces/books/bookModel";

const bookSchema = new mongoose.Schema<BookModelInterface>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default mongoose.model("Book", bookSchema);
