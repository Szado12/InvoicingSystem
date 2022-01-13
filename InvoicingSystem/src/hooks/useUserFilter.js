import { useState } from 'react';

function useUserFilter() {
	const [ showByFirstName, setShowByFirstName ] = useState('');
	const [ showByLastName, setShowByLastName ] = useState('');
	const [ showByRole, setShowByRole ] = useState(null);
	const [ showByManagerName, setShowByManagerName ] = useState('');
	const [ showByStatus, setShowByStatus ] = useState(1);

	return {
		showByFirstName,
		setShowByFirstName,
		showByLastName,
		setShowByLastName,
		showByRole,
		setShowByRole,
		showByManagerName,
		setShowByManagerName,
		showByStatus,
		setShowByStatus
	};
}

export default useUserFilter;
