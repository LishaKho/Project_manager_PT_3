import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
import Delete from './Delete';

const Edit = (props) => {
	const { id } = props;
	
	const [ title, setTitle ] = useState("");
	const [ price, setPrice ] = useState("");
	const [ description, setDescription ] = useState("");
	const [ errors, setErrors ] = useState({});


	useEffect(() => {
		axios.get("http://localhost:8000/api/products/" + id)
			.then((res) => {
				console.log(res.data);
				// setRestaurant(res.data);
				setTitle(res.data.title);
				setPrice(res.data.price);
				setDescription(res.data.description);
			})
			.catch((err) => {
				console.log(err)
			});
	}, []);

	const redirectAfterDelete = () => {
		navigate("/products");
	}

	const handleSubmit = (e) => {
		// whenever a form is submitted we must - if we don't we will lose all of our state!!
		e.preventDefault();

		// this syntax is a matter of preference - see the edit component for alternate syntax
		const tempProducts = {
			title,
			price,
			description,
		};

		axios.put("http://localhost:8000/api/products/" + id, tempProducts)
			.then((res) => {
				console.log(res);
				navigate("/products/" + res.data._id);
			})
			.catch((err) => {
				console.log(err);
				console.log(err.response.data.errors);
				// err.response.data is the body that you get in Postman
				if(err.response.data.errors) {
					// save the errors in state so we can display them
					setErrors(err.response.data.errors);
				}
			})
	}

	return (
		<div>
			<h2>Edit Product</h2>
			<form>
				<div>
					<label>Title</label>
					{
						errors.title ? 
							<span className="error-text">{errors.title.message}</span>
							: null
					}
					<input
						type="text"
						name="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						/>
				</div>
				<div>
					<label>Price</label>
					{
						errors.price ? 
							<span className="error-text">{errors.price.message}</span>
							: null
					}
					<input
						type="text"
						name="price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						/>
				</div>
				<div>
					<label>Description</label>
					{
						errors.description ? 
							<span className="error-text">{errors.description.message}</span>
							: null
					}
					<input
						type="text"
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						/>
				</div>
			</form>
			<div>
				<button onClick={handleSubmit}>Update Product</button>
				<Delete productId={id} afterDelete={redirectAfterDelete} />
			</div>
		</div>
	)
}

export default Edit;
