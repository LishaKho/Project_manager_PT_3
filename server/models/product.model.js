const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, "A product name is required"],
		minLength: [5, "A product name must be at least 5 characters long"],
	},
	price: {
		type: String,
		required: [true, "A product price is required"],
	},
	description: {
		type: String,
		required: [true, "A product description is required"],
	},
}, { timestamps: true });

// collection name and the schema are required to create a model
module.exports = mongoose.model("Product", ProductSchema);
