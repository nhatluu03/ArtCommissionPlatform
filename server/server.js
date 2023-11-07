import {User} from "./models/user.model.js";
import express from 'express';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import roles from "./roles.js";
import path from "path";
import route from "./routes/index.js";
import './utils/loadEnv.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose
  .connect("mongodb://0.0.0.0:27017/art_commission")
  .then(() => {
    console.log("Connected to the Database successfully");
  }); 
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userId, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
      res.locals.loggedInUser = await User.findById(userId);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

route(app);

app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});
