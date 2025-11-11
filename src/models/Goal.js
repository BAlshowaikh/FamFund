const mongoose = require("mongoose")

const goalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, "Title should have more than 2 chars."],
        maxlength: [100, "Title shouldn't have more than 100 chars."]
    },

    description: {
        type: String,
        required: false,
        minlength: [5, "Description should have more than 5 chars."],
        maxlength: [200, "Description shouldn't have more than 200 chars."]
    },

    targetAmount: {
        type: Number,
        required: true,
        min: [10, "Target shouldn't be less than 10 BD"],
        max: [10000, "Target shouldn't be more than 10000 BD"],
    },

    currentAmount: { 
        type: Number, 
        default: 0 
    },

    status: {
        type: String,
        enum: ["Active", "Completed", "Not Active"],
        default: "Active"
    },

    dueDate: {
        type: Date,
        required: false
    },

    coverImgURL: {
        type: String,
        required: false
    },

    familyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family",
        required: true
    },

    createdByUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
        timestamps: true
})


const Goal = mongoose.model("Goal", goalSchema)
module.exports = Goal
