import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const AllProducts = (props) => {
    const [ title, setTitle ] = useState("");
	const [ price, setPrice ] = useState("");
	const [ description, setDescription ] = useState("");

	const [ allProducts, setAllProducts ] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8000/api/products")
			.then((res) => {
				console.log(res);
				setAllProducts(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		// always remember the dependencies array - empty is fine!
	}, []);

    const handleSubmit = (e) => {
		// whenever a form is submitted we must - if we don't we will lose all of our state!!
		e.preventDefault();

		// this syntax is a matter of preference - see the edit component for alternate syntax
		const newProduct = {
			title,    // new ES6 shortcut syntax - if key and value are the same name, just put it once
			price,  // ES5 syntax when key and the value (getter in state) are both written out
			description,
		};
		axios.post("http://localhost:8000/api/products/", newProduct)
			.then((res) => {
				console.log(res);
				navigate("/products/" + res.data._id);
			})
			.catch((err) => {
				console.log(err);
			})
        }
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title</label>
					<input
						type="text"
						name="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						/>
				</div>
				<div>
					<label>price</label>
					<input
						type="text"
						name="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						/>
				</div>
				<div>
					<label>Description</label>
					<input
						type="text"
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						/>
				</div>
				<div>
					<button type="submit">Add Product</button>
				</div>
			</form>
            <hr/>
			<h2>All Products</h2>
			{
				allProducts.map((product, index) => {
					console.log(product.title);

					return (
					<div key={index}>
						<Link to={"/products/" + product._id}>{product.title}</Link> 
					</div>
				)}
				)
			}
		</div>
	)
}

export default AllProducts;
