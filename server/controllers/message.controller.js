// import Message from "../models/message.model.js";
// import mongoose from "mongoose";
// import { User } from "../models/user.model.js";

// class MessageController {
//   // index = async (req, res, next) => {
//   //   try {
//   //     const messages = await Message.find({ conversationId: req.params.id });
//   //     res.status(200).json(messages);
//   //   } catch (error) {
//   //     next(error);
//   //   }
//   // };

//   store = async (req, res, next) => {
//     const message = new Message(req.body);
//     try {
//       const savedMessage = await message.save();
//       res.status(200).json(savedMessage);
//     } catch (error) {
//       next(error);
//     }
//   };

//   show = async (req, res, next) => {
//     try {
//       const { id } = req.params;
  
//       // Check if id is a valid ObjectId
//       if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ error: "Invalid conversationId" });
//       }
//       const messages = await Message.find({ conversationId: id });
//       res.status(200).json(messages);
//     } catch (error) {
//       next(error);
//     }
//   };
  
  

//   update = async (req, res, next) => {};

//   destroy = async (req, res, next) => {};
// }

// export default new MessageController();
