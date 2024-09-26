import {
  User,
  TalentUser,
  ClientUser,
  AdminUser,
} from "../models/user.model.js";
import Artwork from "../models/artwork.model.js";
import Commission from "../models/commission.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import roles from "../roles.js";
import "mongoose";
import "../utils/loadEnv.js";
import createError from "../utils/createError.js";
import 'cookie-parser'

class UserController {
  async validatePassword(plaintPassword, hashedPassword) {
    return await bcrypt.compare(plaintPassword, hashedPassword);
  }

  grantAccess(action, resource) {
    return async (req, res, next) => {
      try {
        const permission = roles.can(req.user.role)[action](resource);
        if (!permission.granted) {
          return res.status(401).json({
            error: "You don't have enough permission to perform this action",
          });
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  allowIfLoggedIn = async (req, res, next) => {
    try {
      // const user = res.locals.loggedInUser;
      // if (!user) {
      //   return res.status(401).json({
      //     error: "You need to login to access this resource",
      //   });
      // }
      // req.user = user;
      // next();
      console.log(req.cookies)
      const token = req.cookies.accessToken;
      if (!token) return next(createError(401, "You are not authenticated!"));
      jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
        if (error) return next(createError(403, "Token is not valid"));
        req.userId = payload.userId;
        req.user = await User.findById(payload.userId);

        // Check if user exists
        if (!req.user) {
          return next(createError(404, "User not found"));
        }
        next();
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
    //   const { username, password, fullname, role } = req.body;

      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        res.status(400).json({
          error: "Username already exists",
        });
      }

    //   // Hash the password for security
    //   const hashedPassword = await bcrypt.hash(req.body.password, 10);

    //   // Create a new user based on the role
    //   let newUser;
    //   switch (role) {
    //     case "talent":
    //       newUser = new TalentUser({
    //         username,
    //         password: hashedPassword,
    //         fullname,
    //         role,
    //       });
    //       break;
    //     case "client":
    //       newUser = new ClientUser({
    //         username,
    //         password: hashedPassword,
    //         fullname,
    //         role,
    //       });
    //       break;
    //     case "admin":
    //       newUser = new AdminUser({
    //         username,
    //         password: hashedPassword,
    //         fullname,
    //         role,
    //       });
    //       break;
    //     default:
    //       return res.status(400).json({ error: "Invalid role" });
    //   }

      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "90d" }
      );
      newUser.accessToken = accessToken;

      // Save the user to the database
      await newUser.save();
      const { password: userPassword, ...others } = newUser._doc;

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true, // This ensures the cookie is only accessible by the server
          maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 day in this example)
        })
        .status(200)
        .send(others);

      // res.status(200).json({ message: "You have registered successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  login = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user)
        return res.status(404).json({
          error: "User not found",
        });

      const validated = bcrypt.compareSync(req.body.password, user.password);
      if (!validated)
        return res.status(404).json({
          error: "Wrong password or username",
        });

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      const { password, ...others } = user._doc;
      res.cookie("accessToken", accessToken, {
        httpOnly: true, // This ensures the cookie is only accessible by the server
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 day in this example)
      });
      res.status(200).send(others);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  logout = async (req, res) => {
    res
      .clearCookie("accessToken", {
        sameSite: "none",
      })
      .status(200)
      .send("User has been logged out.");
  };

  index = async (req, res, next) => {
    try {
      const talents = await User.find({ role: "talent" });
      const result = [];

      // Iterate through each talent
      for (var i = 0; i < talents.length; i++) {
        const talent = talents[i];
        // Find the top 3 artworks loved by other people for each talent
        const top3Artworks = await Artwork.find({ talent: talent._id })
          .sort({ likes: -1 })
          .limit(3)
          .exec();

        // Count the number of commissions for each talent
        const commissions = await Commission.countDocuments({
          talent: talent._id,
        });

        // Push talent's information, top 3 loved artworks, and commission count to the result array
        result.push({
          talent,
          top3Artworks: top3Artworks.map((artwork) => ({
            _id: artwork._id,
            image: artwork.images[0],
            // image: () => { return artwork.images.length > 0 ? artwork.images[0] : "https://th.bing.com/th/id/OIP.Z_PIeIRDajXPmZHROt-T_QHaEK?w=324&h=182&c=7&r=0&o=5&pid=1.7"},
          })),
          commissions: commissions,
        });
      }

      // Send the result as JSON response
      res.status(200).json(result);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  show = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      // Check if user exists
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      // If profile's not belong to talent or self signed
      if (user.role == "client" || req.userId !== user._id) {

        // If
        return res.status(400).json({
          error: "You cannot view this profile",
        });
      }

      const { accessToken, password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    if (req.user._id.toString() !== req.params.id)
      return res.status(400).send("You can update your account only");
    try {
      //Update User
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  destroy = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    //Check userOwner
    if (req.user._id.toString() !== req.params.id)
      return res.status(400).send("You can delete only your account");
    try {
      //Delete user
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User has been deleted");
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
