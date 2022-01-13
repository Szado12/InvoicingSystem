import React, { useContext, useState } from 'react';
import GenericTypeahead from '../../Utils/GenericTypeahead';
import { InvoiceWizardContext } from '../../../contexts/InvoiceWizardContext';
import { Contractor, DefaultContractor } from '../../Utils/Contractor';
import { Col, Row, Divider, Collapse } from 'antd';
export function InvoiceWizardContractor() {
	const { invoiceModel, SetContractorId } = useContext(InvoiceWizardContext);

	const [ contractor, setContractor ] = useState<Contractor>({
		id: invoiceModel.contractorId,
		companyName: '',
		address: '',
		zipCode: '',
		nip: '',
		city: ''
	});

	const SetContractor = (contractor: any) => {
		try {
			if (contractor.length > 0) {
				SetContractorId(contractor[0].id);
				setContractor(contractor[0]);
				console.log(contractor[0]);
			} else setContractor(DefaultContractor);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Col sm={24} md={12}>
			<Row>
				<h3>Kontrahent</h3>
				<Divider />
			</Row>
			<Row>
				<Col xs={24} style={{ padding: '0px 25px 0px 0px' }}>
					<GenericTypeahead
						onChange={SetContractor}
						selected={contractor}
						url={`https://localhost:44325/api/contractors`}
						type={'contractor'}
					/>
					<Collapse style={{ border: 'none' }}>
						<Collapse.Panel header="Więcej informacji o kontrahencie" key="1" style={{ fontSize: '1.2em' }}>
							<Row>
								<Col xs={12}>Adres:</Col>
								<Col xs={12}>{contractor.address}</Col>
							</Row>
							<Row>
								<Col xs={12} offset={12}>
									{contractor.zipCode} {contractor.city}
								</Col>
							</Row>
							<Row>
								<Col xs={12}>NIP:</Col>
								<Col xs={12}>{contractor.nip}</Col>
							</Row>
						</Collapse.Panel>
					</Collapse>
				</Col>
			</Row>
		</Col>
	);
}
