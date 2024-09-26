import Conversation from "../models/conversation.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const ConversationController = {
  // Get conversations for a specific user with the last message
  getConversationsByUserId: async (req, res) => {
    try {
      const userId = req.params.userId;
      const conversations = await Conversation.find({
        "members.user": userId,
      })
        .populate({
          path: "members.user",
          select: "username fullname avatar", // Add other fields as needed
        })
        .select("members messages")
        .exec();
      const formattedConversations = conversations.map((conversation) => {
        const otherMember = conversation.members.find(
          (member) => String(member.user._id) !== userId
        );
        const lastMessage =
          conversation.messages[conversation.messages.length - 1];

        return {
          _id: conversation._id,
          otherMember: {
            userId: otherMember.user._id,
            username: otherMember.user.username,
            fullname: otherMember.user.fullname,
            avatar: otherMember.user.avatar,
          },
          lastMessage: !lastMessage
            ? null
            : {
                senderId: lastMessage?.senderId,
                content: lastMessage?.content,
                reactions: lastMessage?.reactions,
              },
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
        };
      });
      res.json(formattedConversations);
    } catch (error) {
      throw error;
    }
  },

  // Get a specific conversation by ID
  getConversationById: async (req, res) => {
    try {
      const conversationId = req.params.id;
      const userId = req.query.userId;
      const conversation = await Conversation.findById(conversationId)
        .populate({
          path: "members.user",
          select: "username fullname avatar", // Add other fields as needed
        })
        .select("members messages")
        .exec();
      let formattedConversation;
      if (conversation) {
        const otherMember = conversation.members.find(
          (member) => String(member.user._id) !== userId
        );
        formattedConversation = {
          _id: conversation._id,
          otherMember: {
            userId: otherMember.user._id,
            username: otherMember.user.username,
            fullname: otherMember.user.fullname,
            avatar: otherMember.user.avatar,
          },
          messages: conversation.messages,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
        };
      } else {
        // Handle the case when the conversation with the given ID is not found
        console.log("Conversation not found");
      }
      res.json(formattedConversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Create a new conversation
  createConversation: async (req, res) => {
    try {
      const newConversation = await Conversation.create(req.body);
      newConversation.save();
      res.status(200).json(newConversation);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // PUT : conversations/:id
  sendMessage: async (req, res) => {
    try {
      const conversationId = req.params.id;
      const userId = req.query.userId;
      const { senderId, content } = req.body;
      const conversation = await Conversation.findById(conversationId)
        .populate({
          path: "members.user",
          select: "username fullname avatar", // Add other fields as needed
        })
        .select("members messages")
        .exec();
      let formattedConversation;
      if (conversation) {
        const otherMember = conversation.members.find(
          (member) => String(member.user._id) !== userId
        );
        formattedConversation = {
          _id: conversation._id,
          otherMember: {
            userId: otherMember.user._id,
            username: otherMember.user.username,
            fullname: otherMember.user.fullname,
            avatar: otherMember.user.avatar,
          },
          messages: conversation.messages,
          createdAt: conversation.createdAt,
          updatedAt: conversation.updatedAt,
        };
      } else {
        // Handle the case when the conversation with the given ID is not found
        console.log("Conversation not found");
      }
      const newMessage = {
        senderId,
        content,
      };
      conversation.messages.push(newMessage);
      await conversation.save();

      res.status(200).json(formattedConversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  isMember: (conversation, userId) => {
    // Check if the user is a member of the conversation
    const isMember = conversation.members.some(
      (member) => String(member.user) === userId
    );
    return isMember;
  },

  reactOnMessage: async (req, res) => {
    try {
      const conversationId = req.params.id;
      const messageId = req.params.messageId;
      const userId = req.userId;
      const { reaction } = req.body;

      // const { messageId, userId, reaction } = req.body;
      const conversation = await Conversation.findById(conversationId);

      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      const message = conversation.messages.find(
        (msg) => String(msg._id) === messageId
      );

      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }

      if (!this.isMember(conversation, req.user._id)) {
        return res
          .status(403)
          .json({ error: "User is not a member of the conversation" });
      }

      // // Update the reaction of the message
      message.reactions = reaction;
      await conversation.save();

      res.status(200).json({
        conversationId,
        messageId,
        reaction,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default ConversationController;
