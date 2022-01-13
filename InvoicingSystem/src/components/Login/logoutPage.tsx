import { UserDataContext } from '../../contexts/UserDataContext';
import React, { useContext } from 'react';

export default function LogoutPage() {
	const { LogOut } = useContext(UserDataContext);
	useEffect(() => {
		LogOut();
	});
}
