import React from 'react';
import { InvoiceRowPreview } from './InvoiceRowPreview';
import { InvoiceRowSum } from './InvoiceRowSum';
import { InvoiceRow } from '../../Utils/InvoiceRow';
import { Col, Row, Divider } from 'antd';

export function InvoicePreviewProductsTable(prop: { invoiceRows: InvoiceRow[] }) {
	return (
		<div>
			<Row>
				<Divider />
				<Col xs={24}>
					<h3>Pozycje na fakturze:</h3>
				</Col>
			</Row>
			<div>
				<Row>
					<Col xs={24}>
						<Row className={'InvoiceWizardProductTable'}>
							<Col xs={8} style={{ textAlign: 'left' }}>
								Nazwa produktu/usługi:
							</Col>
							<Col xs={2}>Ilość:</Col>
							<Col xs={2}>Zniżka:</Col>
							<Col xs={2}>Cena netto:</Col>
							<Col xs={2}>Cena netto ze zniżką:</Col>
							<Col xs={2}>Wartość netto:</Col>
							<Col xs={2}>Vat:</Col>
							<Col xs={2}>Wartość vat:</Col>
							<Col xs={2}>Wartość brutto:</Col>
						</Row>
					</Col>
				</Row>
			</div>
			<div>
				{prop.invoiceRows != null &&
					prop.invoiceRows.map((x: InvoiceRow, index: number) => (
						<InvoiceRowPreview invoiceRow={x} index={index} key={'InvoiceRowPreview' + index} />
					))}
				{prop.invoiceRows != null && <InvoiceRowSum invoiceRows={prop.invoiceRows} />}
			</div>
		</div>
	);
}
