import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import InvoicesListRow from './InvoicesListRow';
import { InvoiceListModel } from '../Utils/InvoiceListModel';
import axios from 'axios';

export default function InvoicesList() {
	const [ a, setA ] = useState<InvoiceListModel[]>([]);
	const GetInvoices = () => {
		axios.get<InvoiceListModel[]>('https://localhost:44325/api/invoices').then((response) => {
			setA(response.data);
		});
	};
	console.log(a);
	useEffect(() => {
		GetInvoices();
	}, []);

	return (
		<div>
			<Row>
				<Col xs={2}>Numer faktury</Col>
				<Col xs={5}>Kontahent</Col>
				<Col xs={2}>Data utworzenia</Col>
				<Col xs={2}>Data modyfikacji</Col>
			</Row>
			{a.map((invoice, index) => (
				<InvoicesListRow InvoiceData={invoice} Index={index + 1} key={'InvoicesListRow' + index} />
			))}
		</div>
	);
}
