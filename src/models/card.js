const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
            default: "No Name 1",
		},
		birth_date: {
			type: String,
			required: true,
            default: () => Date.now()
		},
	},
	{
		timestamps: true,
	}
);

const Card = new mongoose.model("Card", CardSchema);
// // ADD's or DROP's unique indexes
Card.syncIndexes();

module.exports = Card;
