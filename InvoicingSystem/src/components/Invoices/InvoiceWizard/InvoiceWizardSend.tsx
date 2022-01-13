import React, { useContext, useState } from 'react';
import { InvoiceWizardContext } from '../../../contexts/InvoiceWizardContext';
import { Button } from 'react-bootstrap';
import { Col } from 'antd';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Modal } from 'react-bootstrap';

export function InvoiceSaveModal(prop:{message: string, title:string, show: boolean, setter: (x:boolean) => void}) {
	return (
		<Modal style={{ width: '100%' }} show={prop.show} onHide={() => prop.setter(false)}>
			<Modal.Header>
                <Modal.Title>{prop.title}</Modal.Title>
            </Modal.Header>
			<Modal.Body>
			<Col xs={24}>
				{prop.message}
			</Col>
			<Col xs={24} style={{textAlign:"center"}}>
				<Button className="w-25" variant="outline-danger" onClick={() =>  prop.setter(false)}>
					Anuluj
				</Button>
			</Col>
			</Modal.Body>
		</Modal>
	);
}

export function InvoiceWizardSend() {
	const [ show, setShow ] = useState(false);
	const [title, setTitle] = useState('');
	const [message,setMessage] = useState('');
	const { invoiceModel, requestType } = useContext(InvoiceWizardContext);
	let history = useHistory();
	const CheckInvoice = () =>{
		if(invoiceModel.invoiceRows.length <= 0)
			{
				setTitle("Brak produktów/usług");
				setMessage("Nie dodano żadnych usług lub produktów do faktury");
				setShow(true);
				return;
			}
		if(invoiceModel.paymentMethodId <= 0)
		{
			console.log(invoiceModel.paymentMethodId);
			setTitle("Błędny sposób płatności");
			setMessage("Nie wybrano sposobu płatności");
			setShow(true);
			return;
		}
		if(invoiceModel.contractorId <= 0)
		{
			setTitle("Błędny kontrahent");
			setMessage("Nie wybrano kontrahenta");
			setShow(true);
			return;
		}
		SendRequest();
	}
	const SendRequest = () => {
		axios
			.post('https://localhost:44325/api/invoices?action=' + requestType, { ...invoiceModel })
			.then((response) => {
				
				localStorage.removeItem('addInvoice');
				localStorage.removeItem('invoiceAction');

				setShow(true);
				setMessage("Zapisano zmiany");
				history.push("/preview/"+response.data);
			})
			.catch((error) => {
				setMessage("Błąd");
				setShow(true);
			});
	};
	return (
		<>
		<Col offset={14} xs={10}>
			<Button onClick={() => CheckInvoice()}> Zatwierdź zmiany</Button>
		</Col>
		<InvoiceSaveModal message={message} title={title} show={show} setter={setShow}/>
		</>
	);
}
