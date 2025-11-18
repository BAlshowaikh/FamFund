const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Join Request", "Contribution Request"],
      required: true,
    },

    familyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: true,
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },
    triggeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Notification = mongoose.model("Notification", notificationSchema)
module.exports = Notification
