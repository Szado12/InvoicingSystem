import React from 'react';
import { InvoiceFilterProvider } from '../../contexts/InvoiceTableFilterContext';
import InvoicesToolbar from './InvoicesToolbar';
import InvoicesList from './InvoicesList';
import { Divider } from 'antd';

export default function Invoices() {
	return (
		<InvoiceFilterProvider>
			<div style={{ fontSize: '1.2em' }}>
				<h2>Faktury</h2>
				<Divider />
				<InvoicesToolbar />
				<InvoicesList />
			</div>
		</InvoiceFilterProvider>
	);
}
