import { useState } from 'react';
import { InvoiceModel, DefaultInvoiceModel } from '../components/Utils/InvoiceModel';
import { InvoiceRow, DefaultInvoiceRow } from '../components/Utils/InvoiceRow';

function useInvoiceModel() {
	const [ invoiceModel, setInvoiceModel ] = useState<InvoiceModel>(DefaultInvoiceModel);
	const [ requestType, setRequestType ] = useState('add');

	const SaveInvoiceModel = (newInvoiceModel: InvoiceModel) => {
		if (requestType === 'edit') localStorage.setItem('editInvoice', JSON.stringify(newInvoiceModel));
		else localStorage.setItem('addInvoice', JSON.stringify(newInvoiceModel));
		setInvoiceModel(newInvoiceModel);
	};

	const SetInvoiceNumber = (invoiceNumber: string) => {
		SaveInvoiceModel({ ...invoiceModel, invoiceNumber: invoiceNumber });
	};
	const AddInvoiceRow = () => {
		SaveInvoiceModel({ ...invoiceModel, invoiceRows: [ DefaultInvoiceRow, ...invoiceModel.invoiceRows ] });
	};
	const EditRow = (index: number, newInvoiceRow: InvoiceRow) => {
		let invoiceRowsCopy = [ ...invoiceModel.invoiceRows ];
		invoiceRowsCopy[index] = newInvoiceRow;
		SaveInvoiceModel({ ...invoiceModel, invoiceRows: [ ...invoiceRowsCopy ] });
	};
	const CloneRow = (index: number) => {
		let invoiceRowsCopy = invoiceModel.invoiceRows;
		invoiceRowsCopy.splice(index, 0, invoiceRowsCopy[index]);
		SaveInvoiceModel({ ...invoiceModel, invoiceRows: [ ...invoiceRowsCopy ] });
	};
	const SetContractorId = (id: number) => {
		SaveInvoiceModel({ ...invoiceModel, contractorId: id });
	};
	const SetPaymentMethodId = (id: number) => {
		SaveInvoiceModel({ ...invoiceModel, paymentMethodId: id });
	};
	const RemoveRow = (index: number) => {
		let invoiceRowsCopy = invoiceModel.invoiceRows;
		invoiceRowsCopy.splice(index, 1);
		SaveInvoiceModel({ ...invoiceModel, invoiceRows: [ ...invoiceRowsCopy ] });
	};
	const SetDefaultInvoiceModel = () => {
		setRequestType('add');
		localStorage.setItem('currentInvoice', JSON.stringify(DefaultInvoiceModel));
		setInvoiceModel(DefaultInvoiceModel);
	};
	const SetPaymentDate = (date: Date) => {
		console.log(date);
		console.log(typeof date);
		SaveInvoiceModel({ ...invoiceModel, paymentDate: date });
	};
	return {
		invoiceModel,
		setInvoiceModel,
		requestType,
		setRequestType,
		AddInvoiceRow,
		SetInvoiceNumber,
		EditRow,
		CloneRow,
		RemoveRow,
		SetContractorId,
		SetPaymentMethodId,
		SetPaymentDate
	};
}

export default useInvoiceModel;
