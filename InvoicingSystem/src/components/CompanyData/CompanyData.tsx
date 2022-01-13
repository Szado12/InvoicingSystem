import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Col, Row, Divider } from 'antd';
import axios from 'axios';
import { CompanyDataModel } from './CompanyDataModel';
import { LoadingSymbol } from '../Utils/LoadingSymbol';
import { useCompanyData, postCompanyData } from '../ApiCaller/useCompanyData';
import cloneDeep from 'lodash/cloneDeep';
import '../Utils/ListButtons.css';

function CompanyDataRow(prop: {
	fieldTitle: string;
	type: string;
	value: string | number;
	setter: any;
	propertyName: string;
	editMode: boolean;
}) {
	return (
		<Row>
			<Col xs={23}>
				<h6>{prop.fieldTitle}:</h6>
				{prop.editMode && (
					<Form.Control
						type={prop.type}
						onChange={(event) => prop.setter(prop.propertyName, event.target.value)}
						placeholder={prop.fieldTitle}
						value={prop.value}
					/>
				)}
				{!prop.editMode && <h6>{prop.value}</h6>}
			</Col>
		</Row>
	);
}

export default function CompanyData() {
	const [ editMode, setEditMode ] = useState(false);
	const [ companyDataCopy, setCompanyDataCopy ] = useState<CompanyDataModel | null>(null);
	const { loading, companyData, setLoading, setCompanyData } = useCompanyData();

	console.log(useCompanyData());
	const setChangeCompanyData = (property: any, newValue: string | number) => {
		setCompanyData({ ...companyData!, [property]: newValue });
	};

	const enterEditMode = () => {
		setCompanyDataCopy(cloneDeep(companyData));
		setEditMode(true);
	};
	const stopEditMode = () => {
		setCompanyData(companyDataCopy);
		setEditMode(false);
	};
	const saveChanges = () => {
		console.log(postCompanyData(companyData, setEditMode));
	};
	return (
		<div>
			<Row>
				<Col xs={18}>
					<h2>Dane Firmy</h2>
				</Col>
				<Col xs={6}>
					{!editMode && (
						<div className="my-1 d-flex justify-content-end EditorButtonsStyle">
							<Button className="w-50" variant="outline-success" onClick={() => enterEditMode()}>
								Edytuj
							</Button>
						</div>
					)}
					{editMode && (
						<div className="my-1 d-flex justify-content-end EditorButtonsStyle">
							<Button className="w-50" variant="outline-success" onClick={() => saveChanges()}>
								Zapisz
							</Button>
							<Button className="w-50" variant="outline-danger" onClick={() => stopEditMode()}>
								Anuluj
							</Button>
						</div>
					)}
				</Col>
			</Row>
			<Divider />
			{!loading && (
				<Row>
					<Col md={12} xs={24}>
						<h4>Ogólne informacje</h4>
						<Divider />
						<CompanyDataRow
							fieldTitle={'Nazwa firmy'}
							type={'text'}
							value={companyData!.companyName}
							setter={setChangeCompanyData}
							propertyName={'companyName'}
							editMode={editMode}
						/>
						<CompanyDataRow
							fieldTitle={'Numer NIP'}
							type={'number'}
							value={companyData!.nip}
							setter={setChangeCompanyData}
							propertyName={'nip'}
							editMode={editMode}
						/>
					</Col>
					<Col md={12} xs={24}>
						<h4>Adres:</h4>
						<Divider />
						<CompanyDataRow
							fieldTitle={'Ulica, numer budynku, numer mieszkania'}
							type={'text'}
							value={companyData!.address}
							setter={setChangeCompanyData}
							propertyName={'address'}
							editMode={editMode}
						/>
						<CompanyDataRow
							fieldTitle={'Kod pocztowy'}
							type={'text'}
							value={companyData!.zipCode}
							setter={setChangeCompanyData}
							propertyName={'zipCode'}
							editMode={editMode}
						/>
						<CompanyDataRow
							fieldTitle={'Miasto'}
							type={'text'}
							value={companyData!.city}
							setter={setChangeCompanyData}
							propertyName={'city'}
							editMode={editMode}
						/>
					</Col>
					<Col md={12} xs={24}>
						<h4>Płatności:</h4>
						<Divider />
						<CompanyDataRow
							fieldTitle={'Nazwa banku'}
							type={'text'}
							value={companyData!.bankName}
							setter={setChangeCompanyData}
							propertyName={'bankName'}
							editMode={editMode}
						/>
						<CompanyDataRow
							fieldTitle={'Numer konta bankowego'}
							type={'text'}
							value={companyData!.accountNumber}
							setter={setChangeCompanyData}
							propertyName={'accountNumber'}
							editMode={editMode}
						/>
					</Col>
				</Row>
			)}
			{loading && <LoadingSymbol />}
		</div>
	);
}
