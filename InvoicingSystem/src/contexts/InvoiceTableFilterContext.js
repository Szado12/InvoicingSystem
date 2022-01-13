import React, { createContext } from 'react';
import useInvoiceFilter from '../hooks/useInvoiceFilter';

const InvoiceFilterContext = createContext();

function InvoiceFilterProvider({ children }) {
	const {
		showByInvoiceNumber,
		setShowByInvoiceNumber,
		showByContractorName,
		setShowByContractorName,
		showByCreateDate,
		setShowByCreateDate,
		showByModifyDate,
		setShowByModifyDate
	} = useInvoiceFilter();
	return (
		<InvoiceFilterContext.Provider
			value={[
				showByInvoiceNumber,
				setShowByInvoiceNumber,
				showByContractorName,
				setShowByContractorName,
				showByCreateDate,
				setShowByCreateDate,
				showByModifyDate,
				setShowByModifyDate
			]}
		>
			{children}
		</InvoiceFilterContext.Provider>
	);
}
export { InvoiceFilterContext, InvoiceFilterProvider };
