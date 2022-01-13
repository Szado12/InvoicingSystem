import React, {useEffect, useState } from 'react';
import { Col, Row, Accordion } from 'react-bootstrap';
import ContractorsListRow from './ContractorsListRow';
import axios from 'axios';
import { Contractor } from '../Utils/Contractor';
import { AddContractor } from './AddContractor';
import { LoadingSymbol } from '../Utils/LoadingSymbol';

export default function ContractorsList() {
	const [ contractors, setContractors ] = useState<Contractor[]>([]);
	const [ loading, setLoading ] = useState(true);

	const RefreshFunc = () => {
		GetContractors();
	};

	const GetContractors = () => {
		console.log('ref');
		axios.get<Contractor[]>('https://localhost:44325/api/Contractors').then((response) => {
			setContractors(response.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		GetContractors();
	}, []);
	var content;
	if (loading) {
		content = <LoadingSymbol/>;
	} else {
		content = contractors.map((contractor, index) => (
			<ContractorsListRow ContractorData={contractor} Index={index + 1} RefreshFunc={RefreshFunc} key={"ContractorsListRow"+index}/>
		));
	}
	return (
		<>
		<AddContractor RefreshFunc={RefreshFunc}/>
		<Row className="d-flex justify-content-center align-items-center">
				<Col xs={6}>Nazwa kontrahenta</Col>
				<Col xs={4}>Numer NIP</Col>
				<Col xs={2}>Miasto</Col>
		</Row>
		<Accordion>{content}</Accordion>
		</>
	);
}
