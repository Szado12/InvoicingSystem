import React, { useState, useContext, useEffect } from 'react';
import { InvoiceRowWizard } from './InvoiceRowWizard';
import { InvoiceRowSum } from './InvoiceRowSum';
import { InvoiceWizardContext } from '../../../contexts/InvoiceWizardContext';
import { InvoiceRow } from '../../Utils/InvoiceRow';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Divider } from 'antd';
import './InvoiceWizard.css';
export function InvoiceWizardProductsTable() {
	const { invoiceModel, AddInvoiceRow } = useContext(InvoiceWizardContext);
	const [ oldIds, setOldIds ] = useState('');

	useEffect(() => {
		var listIds = '';
		invoiceModel.invoiceRows.forEach((row) => (listIds += row.product.id + ','));
		setOldIds(listIds);
	}, []);

	console.log(invoiceModel.invoiceRows);
	return (
		<div>
			<Row>
				<Divider />
				<Col xs={24}>
					<h3>Pozycje na fakturze:</h3>
				</Col>
			</Row>
			<Row>
				<Col xs={24} style={{ textAlign: 'center' }}>
					<button className={'AddRowButton'} onClick={() => AddInvoiceRow()}>
						<FontAwesomeIcon icon={faPlusSquare} /> Dodaj wiersz
					</button>
				</Col>
			</Row>
			<div>
				<Row>
					<Col xs={23}>
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
			<div className={'InvoiceWizardProductRows'}>
				{invoiceModel.invoiceRows != null &&
					invoiceModel.invoiceRows.map((x: InvoiceRow, index: number) => (
						<InvoiceRowWizard invoiceRow={x} index={index} list={oldIds} key={'InvoiceRowWizard' + index} />
					))}
				{invoiceModel.invoiceRows != null && <InvoiceRowSum />}
			</div>
		</div>
	);
}
