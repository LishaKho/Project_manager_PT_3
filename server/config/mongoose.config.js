const mongoose = require('mongoose');
const dbName = "productDB";

mongoose.connect("mongodb://localhost/" + dbName, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log("You successfully connected to the " + dbName + " database!")
	})
	.catch((err) => {
		console.log("There was an error connecting to the " + dbName + " database:");
		console.log(err);
	});
