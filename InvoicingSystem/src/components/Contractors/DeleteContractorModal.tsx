import React from 'react';
import { Contractor } from '../Utils/Contractor';
import axios from 'axios';
import { Col, Modal, Button } from 'react-bootstrap';

export default function DeleteContractorModal(prop: {
	show: boolean;
	handleClose: () => void;
	ContractorData: Contractor;
	RefreshFunc: () => void;
}) {
	const deleteContractor = () => {
		axios.delete('https://localhost:44325/api/contractors?id=' + prop.ContractorData.id, {}).then((response) => {
			prop.RefreshFunc();
			prop.handleClose();
		});
	};
	//Todo: add call to api
	return (
		<Modal style={{ width: '100%' }} show={prop.show} onHide={prop.handleClose}>
			<Modal.Header>
				<Modal.Title>Usuwanie kontrahenta: {prop.ContractorData.companyName}</Modal.Title>
			</Modal.Header>
			<Modal.Body className={'justify-content-center'}>
				<Col xs={12}>Czy na pewno chcesz usunąć kontrahenta {prop.ContractorData.companyName}?</Col>
			</Modal.Body>
			<Modal.Footer className={'justify-content-center'}>
				<Button className="w-25" variant="outline-danger" onClick={() => deleteContractor()}>
					Usuń
				</Button>
				<Button className="w-25" variant="outline-success" onClick={() => prop.handleClose()}>
					Anuluj
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
