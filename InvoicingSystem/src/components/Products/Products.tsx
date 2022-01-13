import React from 'react';
import ReactDOM from 'react-dom';
import { ProductFilterProvider } from '../../contexts/ProductTableFilterContext';
import ProductsToolbar from './ProductsToolbar';
import ProductsList from './ProductsList';
import { Container } from 'react-bootstrap';
import { Divider } from 'antd';
import './Products.css';

export default function Products() {
	return (
		<ProductFilterProvider>
			<h2>Produkty i Usługi</h2>
			<Divider />

			<div className={'ProductList'}>
				<ProductsToolbar />
				<ProductsList />
			</div>
		</ProductFilterProvider>
	);
}
