import React from 'react';
import { ContractorFilterProvider } from '../../contexts/ContractorTableFilterContext';
import ContractorsToolbar from './ContractorsToolbar';
import ContractorsList from './ContractorsList';
import { Divider } from 'antd';
import './Contractors.css';

export default function Contractors() {
	return (
		<ContractorFilterProvider>
			<h2>Kontrahenci</h2>
			<Divider />

			<div className={'ContractorList'}>
				<ContractorsToolbar />
				<ContractorsList />
			</div>
		</ContractorFilterProvider>
	);
}
