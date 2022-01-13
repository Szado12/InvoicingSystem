import React, { useState } from 'react';
import { User } from '../Utils/User';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Col, Row, Input } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
export function ChangePasswordModal(prop: { show: boolean; handleClose: () => void; UserData: User }) {
	const [ password, setPassword ] = useState('');
	const [ error, setError ] = useState('');

	const changePassword = () => {
		console.log(1);
		if (password == null) {
			setError('Hasło nie może być puste');
			return;
		}
		if (password === '') {
			setError('Hasło nie może być puste');
			return;
		}

		axios
			.post('https://localhost:44325/api/users/restartPassword', {
				employeeID: prop.UserData.id,
				password: password
			})
			.then((response) => {
				prop.handleClose();
			});
	};
	//Todo: add call to api
	return (
		<Modal style={{ width: '100%' }} show={prop.show} onHide={prop.handleClose}>
			<Modal.Header>
				<Modal.Title>
					Zmiana hasła pracownika: {prop.UserData.firstName} {prop.UserData.lastName}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={'justify-content-center'}>
				<Row>
					<Col>
						<b>Wprowadź nowe hasło:</b>
					</Col>
				</Row>
				<Row>
					<Col style={{ color: 'red' }}>{error}</Col>
				</Row>
				<Row>
					<Col xs={24}>
						<Input
							type="password"
							value={password}
							className={'flex-row w-100'}
							onChange={(event) => {
								setPassword(event.target.value);
							}}
						/>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer className={'justify-content-center'}>
				<Button className="w-25" variant="outline-warning" onClick={() => changePassword()}>
					Zmień
				</Button>
				<Button className="w-25" variant="outline-success" onClick={() => prop.handleClose()}>
					Anuluj
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
