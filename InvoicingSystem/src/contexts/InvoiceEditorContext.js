import React, { createContext } from 'react';
import useInvoiceModel from '../hooks/useInvoiceModel';

const InvoiceEditorContext = createContext();

function InvoiceEditorProvider({ children }) {
	const {
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
	} = useInvoiceModel();
	return (
		<InvoiceEditorContext.Provider
			value={{
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
			}}
		>
			{children}
		</InvoiceEditorContext.Provider>
	);
}
export { InvoiceEditorContext, InvoiceEditorProvider };
