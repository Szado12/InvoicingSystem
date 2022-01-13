import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { ContractorFilterContext } from '../../contexts/ContractorTableFilterContext';
import { Divider } from 'antd';

function ContractorsToolbar() {
	const { showByCompanyName, setShowByCompanyName, showByNIP, setShowByNIP, showByCity, setShowByCity } = useContext(
		ContractorFilterContext
	);

	return (
		<Form>
			<Row>
				<Col xs={6} md={6}>
					<Form.Label>Nazwa kontrahenta:</Form.Label>
					<Form.Control
						placeholder="Nazwa kontrahenta"
						value={showByCompanyName}
						onChange={(event) => setShowByCompanyName(event.target.value)}
					/>
				</Col>
				<Col xs={6} md={4}>
					<Form.Label>Numer NIP:</Form.Label>
					<Form.Control
						placeholder="Numer NIP"
						value={showByNIP}
						onChange={(event) => setShowByNIP(event.target.value)}
					/>
				</Col>
				<Col md={2} style={{ padding: '0 1rem', textAlign: 'left' }}>
					<Form.Label>Miasto:</Form.Label>
					<Form.Control
						placeholder="Miasto"
						value={showByCity}
						onChange={(event) => setShowByCity(event.target.value)}
					/>
				</Col>
			</Row>
			<Divider />
		</Form>
	);
}
export default ContractorsToolbar;
