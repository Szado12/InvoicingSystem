import { useState } from 'react';

function useProductsFilter() {
	const [ showByProductNumber, setShowByProductNumber ] = useState('');
	const [ showByProductName, setShowByProductName ] = useState('');
	const [ showByProductPrice, setShowByProductPrice ] = useState([ 0.0, 9999.0 ]);

	return {
		showByProductNumber,
		setShowByProductNumber,
		showByProductName,
		setShowByProductName,
		showByProductPrice,
		setShowByProductPrice
	};
}

export default useProductsFilter;
