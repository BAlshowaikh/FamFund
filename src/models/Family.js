const mongoose = require("mongoose")

const familySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Fmaily name should have more than 2 chars."],
    },

    code: {
      type: String,
      required: true,
      unique: true,
    },

    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Family = mongoose.model("Family", familySchema)
module.exports = Family
