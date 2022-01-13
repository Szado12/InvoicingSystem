import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { InvoiceFilterContext } from '../../contexts/InvoiceTableFilterContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
import { Divider } from 'antd';

function InvoicesToolbar() {
	const [
		showByInvoiceNumber,
		setShowByInvoiceNumber,
		showByContracotrName,
		setShowByContractorName,
		showByCreateDate,
		setShowByCreateDate,
		showByModifyDate,
		setShowByModifyDate
	] = useContext(InvoiceFilterContext);

	return (
		<Form>
			<Row>
				<Col>
					<Form.Label>Numer faktury:</Form.Label>
					<Form.Control
						placeholder="Numer faktury"
						value={showByInvoiceNumber}
						onChange={(event) => setShowByInvoiceNumber(event.target.value)}
					/>
				</Col>
				<Col>
					<Form.Label>Nazwa kontrahenta:</Form.Label>
					<Form.Control
						placeholder="Kontrahent"
						value={showByContracotrName}
						onChange={(event) => setShowByContractorName(event.target.value)}
					/>
				</Col>
				<Col>
					<Form.Label>Data utworzenia:</Form.Label>
					<DatePicker
						className="form-control"
						selected={null}
						onChange={(dates) => setShowByCreateDate(dates)}
						startDate={showByCreateDate[0]}
						endDate={showByCreateDate[1]}
						selectsRange
						dateFormat="dd.MM.yyyy"
						locale={pl}
					/>
				</Col>
				<Col>
					<Form.Label>Data modyfikacji:</Form.Label>
					<DatePicker
						className="form-control"
						selected={null}
						onChange={(dates) => setShowByModifyDate(dates)}
						startDate={showByModifyDate[0]}
						endDate={showByModifyDate[1]}
						selectsRange
						dateFormat="dd.MM.yyyy"
						locale={pl}
					/>
				</Col>
			</Row>
			<Divider />
		</Form>
	);
}
export default InvoicesToolbar;
