const ProductController = require('../controllers/product.controller');

module.exports = (app) => {
	app.get("/api/products", ProductController.getAll);
	// create a new product
	app.post("/api/products", ProductController.create);
	// get a single product
	app.get("/api/products/:id", ProductController.getOne);
	// update a single product
	app.put("/api/products/:id", ProductController.update);
	// delete a single product
	app.delete("/api/products/:id", ProductController.delete);
}