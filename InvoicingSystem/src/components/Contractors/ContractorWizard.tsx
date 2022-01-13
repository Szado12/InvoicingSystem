import React, { useState } from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { Input } from 'antd';
import cloneDeep from 'lodash/cloneDeep';
import { Contractor } from '../Utils/Contractor';

function ReturnContractorRowForCreatorView(prop: {
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

export default function ContractorWizard(prop: {
	show: boolean;
	handleClose: () => void;
	ContractorData: Contractor;
	RefreshFunc: () => void;
	action: string;
}) {
	const ContractorCopy = cloneDeep(prop.ContractorData);
	const [ contractor, setContractor ] = useState(ContractorCopy);
	const setChangeContractor = (property: any, newValue: string | number) => {
		console.log(property, newValue);
		setContractor({ ...contractor, [property]: newValue });
	};

	const postContractor = () => {
		axios
			.post('https://localhost:44325/api/contractors?action=' + prop.action, { ...contractor })
			.then((response) => {
				prop.RefreshFunc();
				prop.handleClose();
			});
	};

	const backToDefaultValue = () => {
		prop.handleClose();
		const defaultContractor = cloneDeep(prop.ContractorData);
		setContractor(defaultContractor);
	};

	return (
		<Modal style={{ width: '100%' }} show={prop.show} onHide={backToDefaultValue}>
			<Modal.Header>
				<Modal.Title>
					{' '}
					{prop.action === 'edit' ? 'Edycja' : 'Dodanie'} kontrahenta: {prop.ContractorData.companyName}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={'justify-content-center'}>
				<Col xs={12}>
					<ReturnContractorRowForCreatorView
						FieldTitle="Nazwa firmy"
						type="text"
						FieldValue={contractor.companyName}
						setter={setChangeContractor}
						propertyName={'companyName'}
					/>
					<ReturnContractorRowForCreatorView
						FieldTitle="Numer NIP"
						type="text"
						FieldValue={contractor.nip}
						setter={setChangeContractor}
						propertyName={'nip'}
					/>
					<ReturnContractorRowForCreatorView
						FieldTitle="Adres"
						type="text"
						FieldValue={contractor.address}
						setter={setChangeContractor}
						propertyName={'address'}
					/>
					<ReturnContractorRowForCreatorView
						FieldTitle="Kod pocztowy"
						type="text"
						FieldValue={contractor.zipCode}
						setter={setChangeContractor}
						propertyName={'zipCode'}
					/>
					<ReturnContractorRowForCreatorView
						FieldTitle="Miasto"
						type="text"
						FieldValue={contractor.city}
						setter={setChangeContractor}
						propertyName={'city'}
					/>
				</Col>
			</Modal.Body>
			<Modal.Footer className={'justify-content-center'}>
				<Button className="w-25" variant="outline-success" onClick={() => postContractor()}>
					Zapisz
				</Button>
				<Button className="w-25" variant="outline-danger" onClick={() => backToDefaultValue()}>
					Anuluj
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
