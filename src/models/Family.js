const mongoose = require("mongoose")
const familySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
)
const Family = mongoose.model("Family", familySchema)
module.exports = Family
