import React, { createContext } from 'react';
import useContractorsFilter from '../hooks/useContractorFilter';

const ContractorFilterContext = createContext();

function ContractorFilterProvider({ children }) {
	const {
		showByCompanyName,
		setShowByCompanyName,
		showByNIP,
		setShowByNIP,
		showByCity,
		setShowByCity
	} = useContractorsFilter();
	return (
		<ContractorFilterContext.Provider
			value={{
				showByCompanyName,
				setShowByCompanyName,
				showByNIP,
				setShowByNIP,
				showByCity,
				setShowByCity
			}}
		>
			{children}
		</ContractorFilterContext.Provider>
	);
}
export { ContractorFilterContext, ContractorFilterProvider };
