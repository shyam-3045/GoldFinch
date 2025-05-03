const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    products: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
