/* eslint-disable no-unused-vars */
import readline from "readline";
import {UserService} from "@users/models";
import { CreateUserInterface } from "@lib/interfaces/users/userModel";
import * as console from "console";
import mongoose from "mongoose";
import env from "@lib/env";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userDetails = {} as CreateUserInterface;
function promptUser(
  question: string,
  property: string,
  validationFn?: (value: string) => boolean
) {
  return new Promise<void>((resolve) => {
    const prompt = () => {
      rl.question(question, (answer) => {
        if (validationFn) {
          if (validationFn(answer.trim())) {
            userDetails[property] = answer.trim();
            resolve();
          } else {
            console.log("Invalid input. Please enter a valid value.");
            prompt();
          }
        } else {
          userDetails[property] = answer.trim();
          resolve();
        }
      });
    };

    prompt();
  });
}

// Email validation function
function isValidEmail(email: string) {
  // Use a simple regex for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password validation function
function isValidPassword(password: string) {
  // Use a regex to check if the password contains 8 to 16 alphanumeric characters
  const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;
  return passwordRegex.test(password);
}

// ...

async function gatherUserDetails() {
  await promptUser("Enter username: ", "username");
  await promptUser("Enter email: ", "email", isValidEmail);
  await promptUser("Enter password: ", "password", isValidPassword);
  await promptUser("Enter first name (press enter to skip): ", "firstName");
  await promptUser("Enter last name (press enter to skip): ", "lastName");

  rl.close();
}

mongoose
  .connect(env.DB_URL_LOCAL)
  .then(() => {
    gatherUserDetails()
      .then(() => {
        userDetails["admin"] = true;
        userDetails["active"] = true;
        const userService = new UserService();
        userService
          .createUser(userDetails)
          .then((r) => {
            console.log("Admin Created successfully");
            console.log(JSON.stringify(r));
            rl.close();
          })
          .catch((err) => {
            console.error(err);
            rl.close();
          });
      })
      .catch((err) => {
        console.error("Error:", err);
        rl.close();
      });
  })
  .catch((err) => {
    console.log(err);
    rl.close();
  });
