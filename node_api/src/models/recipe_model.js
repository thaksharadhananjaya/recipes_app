const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 150
    },
    ingredient: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);