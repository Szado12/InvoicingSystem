import React, { useState } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import GenericTypeahead from '../Utils/GenericTypeahead';
import axios from 'axios';
import { Input } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { User } from '../Utils/User';
import { Role } from '../Utils/Role';
import { ChangePasswordModal } from './ChangePasswordModal';

function ReturnUserRowForCreatorView(prop: {
	FieldTitle: string;
	FieldValue: any;
	type: string;
	setter: any;
	propertyName: string;
}) {
	return (
		<Row noGutters className="d-flex justify-content-center align-items-center">
			<Col xs={4}>
				<b>{prop.FieldTitle}:</b>
			</Col>
			<Col xs={8}>
				<Input
					type={prop.type}
					className={'flex-row w-100'}
					value={prop.FieldValue}
					onChange={(event) => prop.setter(prop.propertyName, event.target.value)}
				/>
			</Col>
		</Row>
	);
}

function ReturnRoleTypeAheadForCreatorView(prop: { fieldTitle: string; setter: any; role: Role | null }) {
	return (
		<Row noGutters className="d-flex justify-content-center align-items-center">
			<Col xs={4}>
				<b>{prop.fieldTitle}:</b>
			</Col>
			<Col xs={8}>
				<GenericTypeahead
					selected={prop.role}
					onChange={prop.setter}
					url={'https://localhost:44325/api/users/roles'}
					type={'role'}
				/>
			</Col>
		</Row>
	);
}

function ReturnManagerTypeAheadForCreatorView(prop: { fieldTitle: string; setter: any; manager: User | null; disabled:boolean }) {
	return (
		<Row noGutters className="d-flex justify-content-center align-items-center">
			<Col xs={4}>
				<b>{prop.fieldTitle}:</b>
			</Col>
			<Col xs={8}>
				<GenericTypeahead
					disabled={prop.disabled}
					selected={prop.manager}
					onChange={prop.setter}
					url={'https://localhost:44325/api/users/managers'}
					type={'manager'}
				/>
			</Col>
		</Row>
	);
}

export default function UserWizard(prop: {
	show: boolean;
	handleClose: () => void;
	UserData: User;
	RefreshFunc: () => void;
	action: string;
}) {
	const UserCopy = cloneDeep(prop.UserData);
	const [ password, setPassword ] = useState('');
	const [ user, setUser ] = useState(UserCopy);
	const [ showChangePasswordModal, setShowChangePasswordModal ] = useState(false);

	const closeChangePasswordModal = () => {
		setShowChangePasswordModal(false);
	};

	const setPasswordChange = (property: any, newValue: string) => {
		setPassword(newValue);
	};

	const setChangeUser = (property: any, newValue: string | number) => {
		setUser({ ...user, [property]: newValue });
	};

	const setRole = (newValue: any) => {
		if (newValue != null) 
		if (newValue.length > 0){
			 setUser({ ...user, ['role']: newValue[0] });
			return;
		}
		setUser({ ...user, ['role']: null });

	};
	const setManager = (newValue: any) => {
		if (newValue != null) 
		if (newValue.length > 0) {
		setUser({ ...user, ['manager']: newValue[0] });
			return;
		}
		setUser({ ...user, ['manager']: null });
	};

	const postUser = () => {
		if (prop.action === 'edit') {
			axios.post('https://localhost:44325/api/users/edit', { ...user }).then((response) => {
				prop.RefreshFunc();
				prop.handleClose();
			});
		} else {
			axios
				.post('https://localhost:44325/api/users/register', { ...user, password: password })
				.then((response) => {
					prop.RefreshFunc();
					prop.handleClose();
				});
		}
	};
	const changePassword = () => {
		axios
			.post('https://localhost:44325/api/users/restartPassword', { password: password, id: user.id })
			.then((response) => {
				prop.RefreshFunc();
				prop.handleClose();
			});
	};

	const backToDefaultValue = () => {
		prop.handleClose();
		const defaultUser = cloneDeep(prop.UserData);
		setUser(defaultUser);
	};

	return (
		<>
		<Modal style={{ width: '100%' }} show={prop.show} onHide={backToDefaultValue}>
			<Modal.Header>
				<Modal.Title>
					{' '}
					{prop.action === 'edit' ? 'Edycja' : 'Dodanie'} pracownika:{' '}
					{prop.UserData.firstName + ' ' + prop.UserData.lastName}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={'justify-content-center'}>
				<Col xs={12}>
					<ReturnUserRowForCreatorView
						FieldTitle="Imię"
						type="text"
						FieldValue={user.firstName}
						setter={setChangeUser}
						propertyName={'firstName'}
					/>
					<ReturnUserRowForCreatorView
						FieldTitle="Nazwisko"
						type="text"
						FieldValue={user.lastName}
						setter={setChangeUser}
						propertyName={'lastName'}
					/>
					<ReturnRoleTypeAheadForCreatorView fieldTitle="Rola" setter={setRole} role={user.role} />
					<ReturnManagerTypeAheadForCreatorView fieldTitle="Manager" setter={setManager} manager={user.manager} disabled={user.role.id !== 3}/>
					{prop.action === 'add' && (
						<ReturnUserRowForCreatorView
							FieldTitle="Hasło"
							type="password"
							FieldValue={password}
							setter={setPasswordChange}
							propertyName={'password'}
						/>
					)}
					{prop.action === 'edit' && (
						<Row style={{ textAlign: 'center', paddingTop: '10px', color: '#1890ff' }}>
							<Col xs={12}>
								<a onClick={() => setShowChangePasswordModal(true)}>Zmień hasło</a>
							</Col>
						</Row>
					)}
				</Col>
			</Modal.Body>
			<Modal.Footer className={'justify-content-center'}>
				<Button className="w-25" variant="outline-success" onClick={() => postUser()}>
					Zapisz
				</Button>
				<Button className="w-25" variant="outline-danger" onClick={() => backToDefaultValue()}>
					Anuluj
				</Button>
			</Modal.Footer>
		</Modal>
        <ChangePasswordModal show={showChangePasswordModal} handleClose={closeChangePasswordModal} UserData={user}/>
		</>
	);
}
