import React, { useContext } from 'react';
import { InvoiceFilterContext } from '../../contexts/InvoiceTableFilterContext';
import '../Utils/ListButtons.css';
import { InvoiceListModel } from '../Utils/InvoiceListModel';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { Accordion, Card, Col, Row, Button } from 'react-bootstrap';
import { CacheInvoice } from './CacheInvoice';

function ShowInvoicePreview(id: number) {
	console.log(id);
}

function IsDisplayed(InvoiceData: InvoiceListModel) {
	const [ showByInvoiceNumber, , showByContractorName, , showByCreateDate, , showByModifyDate ] = useContext(
		InvoiceFilterContext
	);
	var display = InvoiceData.invoiceNumber.toLowerCase().includes(showByInvoiceNumber.toLowerCase());
	if (display) display = InvoiceData.invoiceContractor.toLowerCase().includes(showByContractorName.toLowerCase());
	if (display && showByCreateDate[0] != null && showByCreateDate[1] != null) {
		var startDate = new Date(showByCreateDate[0]);
		var endDate = new Date(showByCreateDate[1]);
		var invoiceDate = moment(InvoiceData.creationDate, 'DD.MM.YYYY').toDate();
		display = endDate >= invoiceDate && startDate <= invoiceDate;
	}
	if (display && showByModifyDate[0] != null && showByModifyDate[1] != null) {
		var startModifyDate = new Date(showByModifyDate[0]);
		var endModifyDate = new Date(showByModifyDate[1]);
		invoiceDate = moment(InvoiceData.modifyDate, 'DD.MM.YYYY').toDate();
		display = endModifyDate >= invoiceDate && startModifyDate <= invoiceDate;
	}
	return display;
}

function ReturnInvoiceRowForExpandedView(prop: { FieldTitle: string; FieldValue: string | Date }) {
	return (
		<Col xs={12} md={6}>
			<Row noGutters className="d-flex justify-content-center align-items-center">
				<Col>
					<b>{prop.FieldTitle}:</b>
				</Col>
				<Col className="d-flex justify-content-start">{prop.FieldValue}</Col>
			</Row>
		</Col>
	);
}

export default function InvoicesListRow(prop: { InvoiceData: InvoiceListModel; Index: number }) {
	let history = useHistory();
	const ShowInvoicePreview = (id: number) => {
		history.push('/preview/' + id);
	};

	return (
		<Accordion>
			<Card hidden={!IsDisplayed(prop.InvoiceData)}>
				<Accordion.Toggle
					as={Card.Header}
					className={`p-0 m-0 container-header container-collapse-header`}
					eventKey={prop.Index.toString()}
				>
					<Row>
						<Col xs={2}>{prop.InvoiceData.invoiceNumber}</Col>
						<Col xs={5}>{prop.InvoiceData.invoiceContractor}</Col>
						<Col xs={2}>{prop.InvoiceData.creationDate}</Col>
						<Col xs={2}>{prop.InvoiceData.modifyDate}</Col>
					</Row>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={prop.Index.toString()}>
					<div>
						<Row noGutters>
							<ReturnInvoiceRowForExpandedView
								FieldTitle="Numer faktury"
								FieldValue={prop.InvoiceData.invoiceNumber}
							/>
							<ReturnInvoiceRowForExpandedView
								FieldTitle="Kontahent"
								FieldValue={prop.InvoiceData.invoiceContractor}
							/>
							<ReturnInvoiceRowForExpandedView
								FieldTitle="Data utworzenia"
								FieldValue={prop.InvoiceData.creationDate}
							/>
							<ReturnInvoiceRowForExpandedView
								FieldTitle="Data modyfikacji"
								FieldValue={prop.InvoiceData.modifyDate}
							/>
							<ReturnInvoiceRowForExpandedView
								FieldTitle="Sposób płatności"
								FieldValue={prop.InvoiceData.paymentMethod}
							/>
							<ReturnInvoiceRowForExpandedView
								FieldTitle="Termin płatności"
								FieldValue={prop.InvoiceData.paymentDate}
							/>
						</Row>
						<Row>
							<Col xs={10} sm className="my-1 d-flex justify-content-center EditorButtonsStyle">
								<Button
									variant="outline-success"
									onClick={() => ShowInvoicePreview(prop.InvoiceData.id)}
								>
									Podgląd
								</Button>
								<Button variant="outline-warning" onClick={() => CacheInvoice(prop.InvoiceData.id)}>
									Edytuj
								</Button>
							</Col>
						</Row>
					</div>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
}
