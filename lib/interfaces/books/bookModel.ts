import { Document } from "mongodb";

export interface BookModelInterface extends Document {
  title: string;
  image: string;
  description: string;
  price: number;
  comments?: Array<string>;
}
