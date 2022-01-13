import React, { useEffect, useState } from 'react';
import { Col, Row, Accordion } from 'react-bootstrap';
import ProductsListRow from './ProductsListRow';
import axios from 'axios';
import { Product } from '../Utils/Product';
import { AddProduct } from './AddProduct';

export default function ProductsList() {
	const [ products, setProducts ] = useState<Product[]>([]);
	const [ loading, setLoading ] = useState(true);

	const RefreshFunc = () => {
		GetProducts();
	};

	const GetProducts = () => {
		console.log('ref');
		axios.get<Product[]>('https://localhost:44325/api/products').then((response) => {
			setProducts(response.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		GetProducts();
	}, []);
	var content;
	if (loading) {
		content = 'ładowanie produktów';
	} else {
		content = products.map((product, index) => (
			<ProductsListRow ProductData={product} Index={index + 1} RefreshFunc={RefreshFunc} key={"ProductsListRow"+index}/>
		));
	}
	return (
		<>
		<AddProduct RefreshFunc={RefreshFunc}/>
		<Row className="d-flex justify-content-center align-items-center">
				<Col xs={2}>Numer katalogowy</Col>
				<Col xs={8}>Nazwa produktu/usługi</Col>
				<Col xs={2} className={'justify-content-end'}>
					Cena
				</Col>
		</Row>
		<Accordion>{content}</Accordion>
		</>
	);
}
