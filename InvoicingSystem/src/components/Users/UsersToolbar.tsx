import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import GenericTypeahead from '../Utils/GenericTypeahead';
import { UserFilterContext } from '../../contexts/UserTableFilterContext';
import 'react-datepicker/dist/react-datepicker.css';
import { Divider } from 'antd';

function UsersToolbar() {
	const {
		showByFirstName,
		setShowByFirstName,
		showByLastName,
		setShowByLastName,
		showByRole,
		setShowByRole,
		showByManagerName,
		setShowByManagerName,
		showByStatus,
		setShowByStatus
	} = useContext(UserFilterContext);

	const managerDisabled = () => {
		if (showByRole == null) return false;
		if (showByRole.length == 0) return false;
		if (showByRole[0].id === 3) return false;
		return true;
	};
	const changeStatus = (option: number) => {
		setShowByStatus(option);
	};

	return (
		<Form>
			<Row>
				<Col xs={6} md={3}>
					<Form.Label>Imię pracownika:</Form.Label>
					<Form.Control
						placeholder="Imię pracownika"
						value={showByFirstName}
						onChange={(event) => setShowByFirstName(event.target.value)}
					/>
				</Col>
				<Col xs={6} md={3}>
					<Form.Label>Nazwisko pracownika:</Form.Label>
					<Form.Control
						placeholder="Nazwisko pracownika"
						value={showByLastName}
						onChange={(event) => setShowByLastName(event.target.value)}
					/>
				</Col>
				<Col xs={6} md={2}>
					<Form.Label>Rola:</Form.Label>
					<GenericTypeahead
						onChange={setShowByRole}
						url={'https://localhost:44325/api/users/roles'}
						type={'role'}
						selected={null}
					/>
				</Col>
				<Col md={3} style={{ padding: '0 1rem', textAlign: 'left' }}>
					<Form.Label>Manager:</Form.Label>
					<GenericTypeahead
						onChange={setShowByManagerName}
						disabled={managerDisabled()}
						url={'https://localhost:44325/api/users/managers'}
						type={'manager'}
						selected={null}
					/>
				</Col>
				<Col md={1} style={{ padding: '0 1rem', textAlign: 'left' }}>
					<Form.Label>Status:</Form.Label>
					<select
						className="form-control"
						id="inputGroupSelect02"
						onChange={(event) => changeStatus(Number(event.target.value))}
					>
						<option value="1" selected>
							Wszyscy
						</option>
						<option value="2">Zwolnieni</option>
						<option value="3">Pracujący</option>
					</select>
				</Col>
			</Row>
			<Divider />
		</Form>
	);
}
export default UsersToolbar;
