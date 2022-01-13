import React, { useState } from 'react';
import { InvoiceWizardProvider } from '../../../contexts/InvoiceWizardContext';
import { InvoiceWizardPayment } from './InvoiceWizardPayment';
import { InvoiceWizardContractor } from './InvoiceWizardContractor';
import { InvoiceWizardProductsTable } from './InvoiceWizardProductsTable';
import { InvoiceWizardLoader } from './InvoiceWizardLoader';
import { Row } from 'antd';
export default function InvoiceWizard(prop: { invoiceId: number }) {

	const [loaded,setLoaded] = useState(false);

	return (
		<InvoiceWizardProvider>
			<InvoiceWizardLoader setLoaded={setLoaded}/>
			{loaded &&
			<>
			<Row> 
				<InvoiceWizardContractor />
				<InvoiceWizardPayment />
			</Row>
			<InvoiceWizardProductsTable />
			</>
			}
		</InvoiceWizardProvider>
	);
}
