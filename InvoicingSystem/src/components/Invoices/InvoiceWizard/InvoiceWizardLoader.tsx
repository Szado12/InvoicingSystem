import React, { useContext, useEffect } from 'react';
import { InvoiceWizardContext } from '../../../contexts/InvoiceWizardContext';
import { InvoiceModel } from '../../Utils/InvoiceModel';
import { Col, Row } from 'antd';
import { InvoiceWizardSend } from './InvoiceWizardSend';
import axios from 'axios';
export function InvoiceWizardLoader(prop: { setLoaded: any }) {
	const { invoiceModel, setInvoiceModel, requestType, setRequestType, SetInvoiceNumber } = useContext(
		InvoiceWizardContext
	);

	useEffect(() => {
		if (localStorage.getItem('addInvoice') !== '' && localStorage.getItem('addInvoice') != null) {
			let SavedInvoiceModel = JSON.parse(localStorage.getItem('addInvoice')!) as InvoiceModel;
			if (SavedInvoiceModel != null) {
				setInvoiceModel(SavedInvoiceModel);
			}
		} else {
			axios
				.get('https://localhost:44325/api/invoices/InvoiceNumber')
				.then((response) => {
					SetInvoiceNumber(response.data);
					console.log(response.data);
				})
				.catch((error) => console.log(error));
		}
		setRequestType('add');
		prop.setLoaded(true);
	}, []);

	return (
		<div>
			<Row>
				<Col xs={18}>
					<h2>Numer faktury: {invoiceModel.invoiceNumber}</h2>
				</Col>
				<Col xs={6}>
					<Row>
						<Col xs={24} className={'RequestTypeAdd'}>
							NOWA FAKTURA
						</Col>
					</Row>
					<Row style={{ textAlign: 'right' }}>
						<InvoiceWizardSend />
					</Row>
				</Col>
			</Row>
		</div>
	);
}
