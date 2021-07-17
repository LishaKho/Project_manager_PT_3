import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';

const Details = (props) => {
	const { id } = props;
	const [ product, setProduct ] = useState({});

	useEffect(() => {
		axios.get("http://localhost:8000/api/products/" + id)
			.then((res) => {
				console.log(res);
				setProduct(res.data);
			})
			.catch((err) => {
				console.log(err)
			});
	}, []);

	return (
		<div>
			<h2>Product Details</h2>
			<table>
				<tbody>
					<tr>
						<td>Title:</td>
						<td>{product.title}</td>
					</tr>
					<tr>
						<td>Price:</td>
						<td>{product.price}</td>
					</tr>
					<tr>
						<td>Description:</td>
						<td>{product.description}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default Details;
