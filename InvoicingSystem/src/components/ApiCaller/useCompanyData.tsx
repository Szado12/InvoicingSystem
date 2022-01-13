import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../../contexts/UserDataContext';

export function useCompanyData() {
	const [ loading, setLoading ] = useState(true);
	const [ companyData, setCompanyData ] = useState<CompanyDataModel | null>(null);

	useEffect(() => {
		axios
			.get<CompanyDataModel>('https://localhost:44325/api/CompanyData')
			.then((response) => {
				setCompanyData(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return { loading, companyData, setLoading, setCompanyData };
}
export function postCompanyData(companyData: CompanyDataModel, setter: (bool: boolean) => void): boolean {
	axios
		.post<CompanyDataModel>('https://localhost:44325/api/CompanyData', { ...companyData })
		.then((response) => {
			setter(false);
		})
		.catch((error) => {
			console.log(error);
			setter(true);
		});
}
