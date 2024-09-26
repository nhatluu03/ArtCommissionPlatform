// import mongoose, { Mongoose } from "mongoose";

// const MessageSchema = new mongoose.Schema(
//   {
//     conversationId: {
//       type: mongoose.Types.ObjectId,
//       ref: "Conversation",
//       required: true,
//     },
//     sender:{
//         type: mongoose.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },
//     text:{
//         type: String,
//     },
//     reactions: {
//       type: String,
//       default: "",
//       enum: ["", "Love", "Care", "Haha", "Wow", "Sad", "Angry"],
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// const Message = mongoose.model("Message", MessageSchema);
// export default Message;
