import React from 'react';
import { Contractor } from '../../Utils/Contractor';
import { Col, Row, Divider } from 'antd';
export function InvoicePreviewContractor(prop: { contractor: Contractor }) {
	return (
		<Col sm={24} md={12}>
			<Row>
				<h3>Kontrahent</h3>
				<Divider />
			</Row>
			<Row>
				<Col xs={24} style={{ padding: '0px 25px 0px 0px' }}>
					<Row>
						<h6>{prop.contractor.companyName}</h6>
					</Row>
					<Row>
						<Col xs={12}>Adres:</Col>
						<Col xs={12}>{prop.contractor.address}</Col>
					</Row>
					<Row>
						<Col xs={12} offset={12}>
							{prop.contractor.zipCode} {prop.contractor.city}
						</Col>
					</Row>
					<Row>
						<Col xs={12}>NIP:</Col>
						<Col xs={12}>{prop.contractor.nip}</Col>
					</Row>
				</Col>
			</Row>
		</Col>
	);
}
