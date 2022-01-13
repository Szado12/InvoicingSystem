import { InvoiceRow } from './InvoiceRow';

export interface InvoiceModel {
	id: number;
	invoiceNumber: string;
	contractorId: number;
	paymentMethodId: number;
	invoiceRows: InvoiceRow[];
	paymentDate: Date;
}
export const DefaultInvoiceModel: InvoiceModel = {
	id: 0,
	invoiceNumber: '',
	contractorId: 0,
	paymentMethodId: 0,
	invoiceRows: [] as InvoiceRow[],
	paymentDate: new Date()
};
