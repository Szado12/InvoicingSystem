import React from 'react';
import { Col, Row } from 'antd';
import {
	InvoiceRow,
	calculateBruttoVatPrice,
	calculateSumVatPrice,
	calculateSumNettoPrice
} from '../../Utils/InvoiceRow';

export const InvoiceRowSum = (prop: { invoiceRows: InvoiceRow[] }) => {
	const sumNettoPrice = prop.invoiceRows
		.map((x: InvoiceRow) => calculateSumNettoPrice(x))
		.reduce((sum: any, price: any) => sum + price, 0)
		.toFixed(2);
	const sumVatPrice = prop.invoiceRows
		.map((x: InvoiceRow) => calculateSumVatPrice(x))
		.reduce((sum: number, price: number) => sum + price, 0)
		.toFixed(2);
	const sumBruttoPrice = prop.invoiceRows
		.map((x: InvoiceRow) => calculateBruttoVatPrice(x))
		.reduce((sum: number, price: number) => sum + price, 0)
		.toFixed(2);
	const style = { textAlign: 'right' };
	return (
		<div>
			<Row style={{ fontSize: '1.2em' }}>
				<Col xs={24}>
					<Row>
						<Col xs={8} style={{ textAlign: 'left' }}>
							Suma:
						</Col>
						<Col xs={8} />
						<Col xs={2} style={style}>
							{sumNettoPrice}
						</Col>
						<Col xs={2} style={style} />
						<Col xs={2} style={style}>
							{sumVatPrice}
						</Col>
						<Col xs={2} style={style}>
							{sumBruttoPrice}
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};
