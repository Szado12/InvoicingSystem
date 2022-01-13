import React, { useState, useEffect } from 'react';
import { Col, Row, Divider } from 'antd';
import axios from 'axios';
import { LoadingSymbol } from '../Utils/LoadingSymbol';
import { ContractorToEmployeesModel, ContractorInfo } from './ContractorToEmployeesModel';
import { Button, Table, Form } from 'react-bootstrap';
import cloneDeep from 'lodash/cloneDeep';

function TableEmployeesRow(Employees: string[]) {
	return (
		<thead>
			<tr>
				<th />
				{Employees.map((emp, index) => (
					<th style={{ textAlign: 'center' }} key={'employee' + index}>
						{emp}
					</th>
				))}
			</tr>
		</thead>
	);
}

function TableContractorsRow(
	contractor: ContractorInfo,
	employeeId: number[],
	edit: boolean,
	setter: (empId: number, conIndex: number) => void,
	conIndex: number
) {
	return (
		<tr>
			<td>{contractor.name}</td>
			{employeeId.map((id, index) => (
				<td style={{ alignItems: 'center' }}>
					<Form.Check
						disabled={!edit}
						className={'d-flex justify-content-center'}
						onChange={() => setter(id, conIndex)}
						checked={contractor.employeesId.some((empId) => empId === id)}
					/>
				</td>
			))}
		</tr>
	);
}

export function ContractorToEmployees() {
	const [ data, setData ] = useState<ContractorToEmployeesModel | null>(null);
	const [ copyBeforeChanges, setCopyBeforeChanges ] = useState<ContractorToEmployeesModel | null>(null);
	const [ edit, setEdit ] = useState(false);
	const [ loading, setLoading ] = useState(true);

	const setter = (empId: number, conIndex: number) => {
		var newValue = cloneDeep(data.contractors);
		var exist = newValue[conIndex].employeesId.findIndex((id) => id === empId);
		if (exist === -1) newValue[conIndex].employeesId.push(empId);
		else newValue[conIndex].employeesId.splice(exist, 1);
		setData({ ...data, ['contractors']: newValue });
	};
	const setEditMode = () => {
		setCopyBeforeChanges(cloneDeep(data));
		setEdit(true);
	};
	const saveChanges = () => {
		axios
			.post<ContractorInfo[]>('https://localhost:44325/api/management',data.contractors)
			.then((response) => {
				setEdit(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const cancelChanges = () => {
		setData(copyBeforeChanges);
		setEdit(false);
	};
	useEffect(() => {
		axios
			.get<ContractorToEmployeesModel>('https://localhost:44325/api/management')
			.then((response) => {
				setData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<div>
				<Row>
					<Col xs={20}>
						<h2>Przypisz kontrahentów do pracowników:</h2>
					</Col>
					{edit && (
					<>
					<Col xs={2} style={{ textAlign: 'right' }}>
						<Button variant='outline-success' onClick={() => saveChanges()}>Zapisz</Button>
					</Col>
					<Col xs={2} style={{ textAlign: 'right' }}>
						<Button variant='outline-danger' onClick={() => cancelChanges()}>Anuluj</Button>
					</Col>
					</>
					)}
					{!edit &&(
					<Col xs={4} style={{ textAlign: 'right' }}>
						<Button onClick={() => setEditMode()}>Edytuj</Button>
					</Col>)}
					<Divider />
				</Row>
				{!loading && (
					<div>
						<Table bordered hover>
							{TableEmployeesRow(data.employees.map((emp) => emp.name))}
							<tbody>
								{data.contractors.map((con, index) =>
									TableContractorsRow(con, data.employees.map((emp) => emp.id), edit, setter, index)
								)}
							</tbody>
						</Table>
					</div>
				)}
				{loading && <LoadingSymbol />}
			</div>
		</div>
	);
}
