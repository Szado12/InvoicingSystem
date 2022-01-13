import React, { useContext } from 'react';
import { Col, Row } from 'antd';
import { InvoiceWizardContext } from '../../../contexts/InvoiceWizardContext';
import {
	InvoiceRow,
	calculateBruttoVatPrice,
	calculateSumVatPrice,
	calculateSumNettoPrice
} from '../../Utils/InvoiceRow';
import './InvoiceWizard.css';

export const InvoiceRowSum = () => {
	const { invoiceModel } = useContext(InvoiceWizardContext);

	const sumNettoPrice = invoiceModel.invoiceRows
		.map((x: InvoiceRow) => calculateSumNettoPrice(x))
		.reduce((sum: any, price: any) => sum + price, 0)
		.toFixed(2);
	const sumVatPrice = invoiceModel.invoiceRows
		.map((x: InvoiceRow) => calculateSumVatPrice(x))
		.reduce((sum: number, price: number) => sum + price, 0)
		.toFixed(2);
	const sumBruttoPrice = invoiceModel.invoiceRows
		.map((x: InvoiceRow) => calculateBruttoVatPrice(x))
		.reduce((sum: number, price: number) => sum + price, 0)
		.toFixed(2);

	return (
		<div>
			<Row>
				<Col xs={23}>
					<Row className={'InvoicePositionCardRow'}>
						<Col xs={8} style={{ textAlign: 'left' }}>
							Suma:
						</Col>
						<Col xs={8} />
						<Col xs={2}>{sumNettoPrice}</Col>
						<Col xs={2} />
						<Col xs={2}>{sumVatPrice}</Col>
						<Col xs={2}>{sumBruttoPrice}</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};
