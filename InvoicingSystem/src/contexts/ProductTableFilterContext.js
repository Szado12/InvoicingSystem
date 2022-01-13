import React, { createContext } from 'react';
import useProductsFilter from '../hooks/useProductsFilter';

const ProductFilterContext = createContext();

function ProductFilterProvider({ children }) {
	const {
		showByProductNumber,
		setShowByProductNumber,
		showByProductName,
		setShowByProductName,
		showByProductPrice,
		setShowByProductPrice
	} = useProductsFilter();
	return (
		<ProductFilterContext.Provider
			value={[
				showByProductNumber,
				setShowByProductNumber,
				showByProductName,
				setShowByProductName,
				showByProductPrice,
				setShowByProductPrice
			]}
		>
			{children}
		</ProductFilterContext.Provider>
	);
}
export { ProductFilterContext, ProductFilterProvider };
