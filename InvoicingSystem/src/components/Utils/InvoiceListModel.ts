export interface InvoiceListModel {
	id: number;
	invoiceNumber: string;
	invoiceContractor: string;
	creationDate: Date;
	paymentMethod: string;
	paymentDate: Date;
	modifyDate: Date;
}
