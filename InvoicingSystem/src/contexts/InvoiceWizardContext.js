import React, { createContext } from 'react';
import useInvoiceModel from '../hooks/useInvoiceModel';

const InvoiceWizardContext = createContext();

function InvoiceWizardProvider({ children }) {
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
		<InvoiceWizardContext.Provider
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
		</InvoiceWizardContext.Provider>
	);
}
export { InvoiceWizardContext, InvoiceWizardProvider };
