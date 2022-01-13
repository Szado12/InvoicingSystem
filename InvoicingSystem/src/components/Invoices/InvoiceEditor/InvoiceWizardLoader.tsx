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
		let SavedInvoiceModel = JSON.parse(localStorage.getItem('editInvoice')!) as InvoiceModel;
		if (SavedInvoiceModel != null) {
			setInvoiceModel(SavedInvoiceModel);
		}
		setRequestType('edit');

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
						<Col xs={24} className={'RequestTypeEdit'}>
							EDYCJA FAKTURY
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
