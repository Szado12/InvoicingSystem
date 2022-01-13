import React from 'react';
import { User } from '../Utils/User';
import axios from 'axios';
import { Col, Row, Modal, Button } from 'react-bootstrap';

export default function DeleteUserModal(prop: {
	show: boolean;
	handleClose: () => void;
	UserData: User;
	RefreshFunc: () => void;
}) {
	const deleteUser = () => {
		axios.delete('https://localhost:44325/api/ussers/fire?userId=' + prop.UserData.id, {}).then((response) => {
			prop.RefreshFunc();
			prop.handleClose();
		});
	};
	return (
		<Modal style={{ width: '100%' }} show={prop.show} onHide={prop.handleClose}>
			<Modal.Header>
				<Modal.Title>
					Zwolnij pracownika: {prop.UserData.firstName} {prop.UserData.lastName}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={'justify-content-center'}>
				<Col xs={12}>
					Czy na pewno chcesz zwolnić pracownika {prop.UserData.firstName} {prop.UserData.lastName}?
				</Col>
			</Modal.Body>
			<Modal.Footer className={'justify-content-center'}>
				<Button className="w-25" variant="outline-danger" onClick={() => deleteUser()}>
					Zwolnij
				</Button>
				<Button className="w-25" variant="outline-success" onClick={() => prop.handleClose()}>
					Anuluj
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
