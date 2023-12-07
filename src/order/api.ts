import { OrderServices } from "./model";
import { BookModel } from "../book/model";

export const createOrder = async (request, response) => {
  try {
    const userId = request.user._id;
    const { bookId, quantity } = request.body;
    const book = await BookModel.findById(bookId);
    if (book) {
      const order = await OrderServices.createOrUpdateOrder(userId, {
        bookId: bookId,
        quantity: quantity,
        title: book.title,
        price: book.price,
      });
      return response.status(201).json(order);
    }
    return response.status(404).json({ message: "Book not found" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserOrders = async (request, response) => {
  try {
    const userId = request.user._id;

    const orders = await OrderServices.getUserOrder(userId);

    response.status(200).json({ orders: orders });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentOrder = async (request, response) => {
  try {
    const userId = request.user._id;
    const currentOrder = await OrderServices.getActiveOrder(userId);
    if (!currentOrder) {
      return response.status(404).json({ message: "No data found" });
    }
    return response.status(200).json(currentOrder);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteOrder = async (request, response) => {
  try {
    // Assuming you have an Order model with a removeOrder method in your BookServices class
    await OrderServices.removeOrder(request.user._id);

    response.status(204).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export const placeOrder = async (request, response) => {
  try {
    // Assuming you have an Order model with a placeOrder method in your BookServices class
    await OrderServices.placeOrder(request.user._id);

    response.status(200).end();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
