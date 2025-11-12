const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Parent", "Child"], required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      required: true,
      default: "Pending",
    },
    profileImageUrl: { type: String, required: false },
    bio: {
      type: String,
      required: false,
      maxlength: [200, "Bio cannot exceed 200 characters"],
    },
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: false,
    },
  },
  { timestamps: true }
)
const User = mongoose.model("User", userSchema)
module.exports = User
