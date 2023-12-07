import {
  createUser,
  deleteUser,
  forgotPassword,
  getUser,
  loginUser,
  resetPassword,
  updateUser,
} from "./api";
import express from "express";
import { jwtDecoder } from "@www/custom.middelewares";

// API routes
export const userAPIRouter = express.Router();
userAPIRouter.route("/register").post(createUser);
userAPIRouter.route("/login").post(loginUser);
userAPIRouter.route("/forgotPassword").post(forgotPassword);
userAPIRouter.route("/resetPassword").post(resetPassword);

// Requires Authentication
userAPIRouter.use(jwtDecoder);
userAPIRouter.route("/").get(getUser).patch(updateUser).delete(deleteUser);
