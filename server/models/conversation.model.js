import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    messages: [
      {
        senderId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
        },
        content: { type: String },
        reactions: {
          type: String,
          default: "",
          enum: ["", "Love", "Care", "Haha", "Wow", "Sad", "Angry"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;
