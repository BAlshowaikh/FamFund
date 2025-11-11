const mongoose = require("mongoose")
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordHashed: { type: String, required: true, unique: true },
    role: { enum: ["Parent", "Child"], required: true },
    status: { enum: ["Pending", "Approved", "Rejected"], required: true },
    profileImageUrl: { type: String, required: true },
    bio: {
      type: String,
      required: false,
      maxlength: [200, "Bio cannot exceed 200 characters"],
    },
    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: true,
    },
  },
  { timestamps: true }
)
const User = mongoose.model("User", userSchema)
module.exports = User
