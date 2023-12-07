export interface BookOrderInterface {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
}

export interface OrderModelInterface {
  userId: string;
  bookData: Array<BookOrderInterface>;
  totalPrice: number;
  orderPlaced: boolean;
}
