import mongoose, { Types } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    // talent: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String, // Assuming 'artwork' or 'commission'
      required: true,
      enum: ['artwork', 'commission'],
    },
    //Array of id from artworks or commissions
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'type', // Dynamically reference either 'Artwork' or 'Commission'
      },
    ],
    // price: {
    //   type: Number,
    //   required: true,
    // },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    review: {
      type: String,
    },
    media: [{ type: String, maxlength: 3 }],
    isCompleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    payment_intent: { 
      type: String, 
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
