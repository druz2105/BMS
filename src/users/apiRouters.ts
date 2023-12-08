import { createUser, deleteUser, getUser, loginUser, updateUser } from "./api";
import express from "express";
import { jwtDecoder } from "@www/custom.middelewares";

// API routes
export const userAPIRouter = express.Router();
userAPIRouter.route("/register").post(createUser);
userAPIRouter.route("/login").post(loginUser);

// Requires Authentication
userAPIRouter.use(jwtDecoder);
userAPIRouter.route("/").get(getUser).patch(updateUser).delete(deleteUser);
