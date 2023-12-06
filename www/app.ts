import express from "express";
import morgan from "morgan";
import { camelCaseParser } from "@www/custom.middelewares";
import { userRouter } from "../src/users/routers";
import { loginView, registerView } from "../src/users/app";
import * as path from "path";
import {bookRouter} from "../src/book/routers";

export const app = express();
app.use(express.static("./public"));
app.set("views", path.join(__dirname.replace("www", "src"), "template"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.redirect("/register");
});
app.get("/login", loginView);
app.get("/register", registerView);

app.use(express.json());
app.use(camelCaseParser);
app.use(morgan("dev"));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);
