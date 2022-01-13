import React, { useContext, useState } from 'react';
import { InvoiceWizardContext } from '../../../contexts/InvoiceWizardContext';
import { Button } from 'react-bootstrap';
import { Col } from 'antd';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Modal } from 'react-bootstrap';

export function InvoiceSaveModal(prop:{message: string, show: boolean, setter: (x:boolean) => void}) {
	return (
		<Modal style={{ width: '100%' }} show={prop.show} onHide={() => prop.setter(false)}>
			<Modal.Header>
                <Modal.Title>{prop.message}</Modal.Title>
            </Modal.Header>
		</Modal>
	);
}

export function InvoiceWizardSend() {
	const [ show, setShow ] = useState(false);
	const [message,setMessage] = useState('');
	const { invoiceModel, requestType } = useContext(InvoiceWizardContext);
	let history = useHistory();
	const SendRequest = () => {
		axios
			.post('https://localhost:44325/api/invoices?action=' + requestType, { ...invoiceModel })
			.then((response) => {
				if(requestType==="edit"){
					localStorage.removeItem('editInvoice');
					localStorage.removeItem('invoiceAction');
				}
				else{
					localStorage.removeItem('addInvoice');
				}
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
			<Button onClick={() => SendRequest()}> Zatwierdź zmiany</Button>
		</Col>
		<InvoiceSaveModal message={message} show={show} setter={setShow}/>
		</>
	);
}
