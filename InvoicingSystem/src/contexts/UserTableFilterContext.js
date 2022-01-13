import React, { createContext } from 'react';
import useUsersFilter from '../hooks/useUserFilter';

const UserFilterContext = createContext();

function UserFilterProvider({ children }) {
	const {
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
	} = useUsersFilter();
	return (
		<UserFilterContext.Provider
			value={{
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
			}}
		>
			{children}
		</UserFilterContext.Provider>
	);
}
export { UserFilterContext, UserFilterProvider };
