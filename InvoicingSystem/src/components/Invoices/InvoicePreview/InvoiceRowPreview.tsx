import { Col, Row } from 'antd';
import React from 'react';
import {
	InvoiceRow,
	calculatePriceNettoDiscounted,
	calculateBruttoVatPrice,
	calculateSumVatPrice,
	calculateSumNettoPrice
} from '../../Utils/InvoiceRow';

export const InvoiceRowPreview = (prop: { invoiceRow: InvoiceRow; index: number }) => {
	const sumNettoPrice = calculateSumNettoPrice(prop.invoiceRow);
	const priceNettoDiscount = calculatePriceNettoDiscounted(prop.invoiceRow);
	const sumVatPrice = calculateSumVatPrice(prop.invoiceRow);
	const sumBruttoPrice = calculateBruttoVatPrice(prop.invoiceRow);

	const style = { textAlign: 'right' };
	return (
		<div>
			<Row>
				<Col xs={24}>
					<Row className={'InvoicePositionCardRow'}>
						<Col xs={8} className={'InvoicePositionCardRowTypeahead'}>
							{prop.invoiceRow.product.name}
						</Col>
						<Col xs={2} style={style}>
							{prop.invoiceRow.numberOfProducts + ' ' + prop.invoiceRow.product.measurementUnits}
						</Col>
						<Col xs={2} style={style}>
							{prop.invoiceRow.discount * 100}%
						</Col>
						<Col xs={2} style={style}>
							{prop.invoiceRow.product.priceNetto.toFixed(2)}
						</Col>
						<Col xs={2} style={style}>
							{priceNettoDiscount.toFixed(2)}
						</Col>
						<Col xs={2} style={style}>
							{sumNettoPrice.toFixed(2)}
						</Col>
						<Col xs={2} style={style}>
							{prop.invoiceRow.product.vat}%
						</Col>
						<Col xs={2} style={style}>
							{sumVatPrice.toFixed(2)}
						</Col>
						<Col xs={2} style={style}>
							{sumBruttoPrice.toFixed(2)}
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};
