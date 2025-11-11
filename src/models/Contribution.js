const mongoose = require("mongoose")

const contributionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        min: [0.1, "Contribution amount shouldn't be less than 100 fils"],
        required: true
    },
    
    message: {
        type: String,
        required: false
    },

    contributorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    goalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Goal",
        required: true
    }
}, {
    timestamps: true
}
)