import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { ProductFilterContext } from '../../contexts/ProductTableFilterContext';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from '@material-ui/core/Slider';
import { Divider } from 'antd';

function InvoicesToolbar() {
	const [
		showByProductNumber,
		setShowByProductNumber,
		showByProductName,
		setShowByProductName,
		showByProductPrice,
		setShowByProductPrice
	] = useContext(ProductFilterContext);

	return (
		<Form>
			<Row>
				<Col xs={6} md={2}>
					<Form.Label>Numer katalogowy:</Form.Label>
					<Form.Control
						placeholder="Numer katalogowy"
						value={showByProductNumber}
						onChange={(event) => setShowByProductNumber(event.target.value)}
					/>
				</Col>
				<Col xs={6} md={3}>
					<Form.Label>Nazwa produktu lub usługi:</Form.Label>
					<Form.Control
						placeholder="Nazwa produktu lub usługi"
						value={showByProductName}
						onChange={(event) => setShowByProductName(event.target.value)}
					/>
				</Col>
				<Col md={2} style={{ padding: '0 1rem', textAlign: 'left' }}>
					<Form.Label>Cena min:</Form.Label>
					<Form.Control
						type="text"
						value={showByProductPrice[0].toFixed(2) + ' PLN'}
						onChange={(event) => setShowByProductPrice([ event.target.value, showByProductPrice[1] ])}
					/>
				</Col>
				<Col md={3}>
					<Slider
						style={{ padding: '45px 0px 0px 0px' }}
						className="slider"
						min={0}
						max={9999}
						step={0.01}
						value={showByProductPrice}
						onChange={(event, newValue: number | number[]) => {
							let value = newValue as number[];
							setShowByProductPrice([ value[0], value[1] ]);
						}}
						aria-labelledby="range-slider"
					/>
				</Col>
				<Col md={2} style={{ padding: '0 1rem', textAlign: 'left' }}>
					<Form.Label>Cena max:</Form.Label>
					<Form.Control
						type="text"
						value={showByProductPrice[1].toFixed(2) + ' PLN'}
						onChange={(event) => setShowByProductPrice([ showByProductPrice[0], event.target.value ])}
					/>
				</Col>
			</Row>
			<Divider />
		</Form>
	);
}
export default InvoicesToolbar;
