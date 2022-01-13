import React from 'react';
import InvoiceNavbar from './components/Navbar/LogedNavbar';
import { UserDataProvider } from './contexts/UserDataContext';
export default function App() {
	return (
		<UserDataProvider>
			<InvoiceNavbar />
		</UserDataProvider>
	);
}
