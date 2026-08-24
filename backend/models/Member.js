const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Member name is required"],
      minlength: [2, "Name must contain at least 2 characters"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [10, "Phone number must contain at least 10 characters"]
    },

    membershipType: {
      type: String,
      enum: {
        values: ["basic", "premium", "platinum"],
        message: "Membership type must be basic, premium, or platinum"
      },
      default: "basic"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Member", memberSchema);