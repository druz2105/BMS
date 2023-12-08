import { Document } from "mongodb";

export interface BookModelInterface extends Document {
  title: string;
  image: string;
  author: string;
  genre: string;
  description: string;
  price: number;
  stock: number;
}

export interface BookCreateInterface {
  title: string;
  image: string;
  author: string;
  genre: string;
  description: string;
  price: number;
  stock: number;
}

export interface BookPatchInterface {
  title?: string;
  image?: string;
  author?: string;
  genre?: string;
  description?: string;
  price?: number;
  stock?: number;
}