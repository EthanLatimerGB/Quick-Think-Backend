const mongoose = require("mongoose");

const { Schema } = mongoose;

const ListSchema = new Schema({
	userID: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	items: [
		{
			itemEnglish: {
				type: String,
				required: true,
				minLength: 4,
			},
			itemForeign: {
				type: String,
				required: true,
				minLength: 4,
			},
			consistantCounter: {
				type: Number,
				min: 0,
				required: true,
			},
			gender: String,
			completed: {
				type: Boolean,
				required: true,
			},
		},
	],
});

const List = mongoose.model("List", ListSchema);

module.exports = List;
