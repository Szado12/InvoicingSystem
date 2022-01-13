import { InvoiceModel } from '../Utils/InvoiceModel';
import axios from 'axios';

export const CacheInvoice = (id: number) => {
	axios
		.get<InvoiceModel>('https://localhost:44325/api/invoices/Id', { params: { id: id, type: 'short' } })
		.then((response) => {
			localStorage.setItem('editInvoice', JSON.stringify(response.data));
			window.location.href = '/invoice/edit';
		});
};
