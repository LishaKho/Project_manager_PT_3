const Product = require('../models/product.model');

module.exports.getAll = (req, res) => {
	console.log("inside get all");

	Product.find()
		.then((allProducts) => {
			console.log(allProducts);
			res.json(allProducts);
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		})
};

module.exports.create = (req, res) => {
	console.log("inside create");
	console.log(req.body);  // holds the json object that we will use for create

	Product.create(req.body)
		.then((newProduct) => {
			console.log(newProduct);
			res.json(newProduct);
		})
		.catch((err) => {
			console.log(err);
			// change the response object status to 400 so the client can see the error
			// then send the error in json back to the client
			res.status(400).json(err);
		})
};

	// get a single Product
module.exports.getOne = (req, res) => {
	console.log("inside getOne");
	console.log("looking for id: " + req.params.id);

	Product.findById(req.params.id)
		.then((oneProduct) => {
			console.log(oneProduct);
			res.json(oneProduct);
		})
		.catch((err) => {
			console.log(err);
			// change the response object status to 400 so the client can see the error
			// then send the error in json back to the client
			res.status(400).json(err);
		})
};

// update a single Product
//	we will need the ID and the data to update an existing document
module.exports.update = (req, res) => {
	console.log("inside update");
	console.log("looking for id: " + req.params.id);
	console.log(req.body);  // holds the json object that we will use for create

	Product.findByIdAndUpdate(req.params.id, req.body, {
		new: true,   					// return the updated object
		runValidators: true,  // use the same validation that was used for create
	})
		.then((updatedProduct) => {
			console.log(updatedProduct);
			res.json(updatedProduct);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		})
}

	// delete a single Product
module.exports.delete = (req, res) => {
	console.log("inside delete");
	console.log("looking for id: " + req.params.id);

	Product.findByIdAndDelete(req.params.id)
		.then((deletedProduct) => {
			// we get the data back as a last chance to keep it
			//	you don't need to do anything with this data if you don't want to
			console.log(deletedProduct);
			res.json(deletedProduct);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		})
}