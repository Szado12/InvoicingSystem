import React, { useState, useEffect } from 'react';
import { InvoicePreviewProductsTable } from './InvoicePreviewProductsTable';
import { InvoicePreviewContractor } from './InvoicePreviewContractor';
import { InvoicePreviewModel } from './InvoicePreviewModel';
import { InvoicePreviewPayment } from './InvoicePreviewPayment';
import { LoadingSymbol } from '../../Utils/LoadingSymbol';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import { Dropdown } from 'react-bootstrap';
import axios from 'axios';
export const InvoicePreview = () => {
	let { id } = useParams();
	const [ loading, setLoading ] = useState(true);
	const [ previewModel, setPreviewModel ] = useState<InvoicePreviewModel | null>(null);
	useEffect(() => {
		axios
			.get<InvoicePreviewModel>('https://localhost:44325/api/invoices/Id', {
				params: { id: id, type: 'full' }
			})
			.then((response) => {
				setPreviewModel(response.data);
				setLoading(false);
			});
	}, []);

	const downloadPDF = (type: string) => {
		axios
			.get(`https://localhost:44325/api/invoices/Pdf`, {
				params: { id: previewModel!.id, type: type },
				responseType: 'blob' // had to add this one here
			})
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([ response.data ]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', previewModel!.invoiceNumber + '.pdf');
				document.body.appendChild(link);
				link.click();
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			{!loading && (
				<div>
					<Row>
						<Col xs={20}>
							<h2>Number faktury: {previewModel!.invoiceNumber}</h2>
						</Col>
						<Col xs={4} style={{ textAlign: 'right' }}>
							<Dropdown>
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									Pobierz plik PDF
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={() => downloadPDF('Oryginał')}>Oryginał</Dropdown.Item>
									<Dropdown.Item onClick={() => downloadPDF('Kopia')}>Kopia</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</Col>
					</Row>
					<Row>
						<InvoicePreviewContractor contractor={previewModel!.contractor} />
						<InvoicePreviewPayment
							payment={previewModel!.paymentMethod}
							paymentDate={previewModel.paymentDate}
						/>
					</Row>
					<InvoicePreviewProductsTable invoiceRows={previewModel!.invoiceRows} />
				</div>
			)}
			{loading && <LoadingSymbol />}
		</div>
	);
};
