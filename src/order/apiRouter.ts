import express from "express";
import { jwtDecoder } from "@www/custom.middelewares";
import {
  createOrder,
  deleteOrder,
  getCurrentOrder,
  getUserOrders,
  placeOrder,
} from "./api";

export const orderAPIRouter = express.Router();
orderAPIRouter.use(jwtDecoder);
orderAPIRouter.get("/list", getUserOrders);
orderAPIRouter.post("/create", createOrder);
orderAPIRouter.get("/current", getCurrentOrder);
orderAPIRouter.patch("/remove/book/:bookId", placeOrder);
orderAPIRouter.patch("/place", placeOrder);
orderAPIRouter.delete("/delete", deleteOrder);
