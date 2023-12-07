import express from "express";
import morgan from "morgan";
import { camelCaseParser } from "@www/custom.middelewares";
import { userAPIRouter } from "../src/users/apiRouters";
import * as path from "path";
import { bookAPIRouter } from "../src/book/apiRouters";
import { loginView, registerView } from "../src/users/app";
import {bookDetailView, bookListView} from "../src/book/app";
import {orderAPIRouter} from "../src/order/apiRouter";
import {currentOrderView} from "../src/order/app";

export const app = express();
app.use("/public", express.static(__dirname.replace("www", "public")));
app.set("views", path.join(__dirname.replace("www", "src"), "template"));
app.set("view engine", "ejs");
app.get("/", (request, response) => {
  response.redirect("/register");
});

// APP view routes
app.get("/login", loginView);
app.get("/register", registerView);
app.get("/book/list", bookListView);
app.get("/book/detail/:bookId", bookDetailView);
app.get("/order/active", currentOrderView);

app.use(express.json());
app.use(camelCaseParser);
app.use(morgan("dev"));

// API routes
app.use("/api/v1/user", userAPIRouter);
app.use("/api/v1/book", bookAPIRouter);
app.use("/api/v1/order", orderAPIRouter);
