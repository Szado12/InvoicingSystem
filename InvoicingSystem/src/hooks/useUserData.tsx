import { UserData } from '../components/Utils/UserData';
import { useState } from 'react';
import axios from 'axios';
export default function useUserData() {
	const LoadUserData = () => {
		if (localStorage.getItem('userData') == null) {
			return null;
		}
		let savedInvoiceModel = JSON.parse(localStorage.getItem('userData')!) as UserData;
		if (savedInvoiceModel == null) {
			return null;
		}
		setIsLogged(true);
		return savedInvoiceModel;
	};

	const SaveUserData = (userData: UserData) => {
		localStorage.setItem('userData', JSON.stringify(userData));
		setIsLogged(true);
		setUserData(userData);
	};

	const LogOut = () => {
		setIsLogged(false);
		setUserData(null);
		localStorage.removeItem('userData');
	};

	const [ isLogged, setIsLogged ] = useState<boolean>(false);
	const [ userData, setUserData ] = useState<UserData | null>(() => {
		try {
			return LoadUserData();
		} catch (error) {
			console.log(error);
			return null;
		}
	});

	axios.interceptors.request.use(function(config) {
		if (userData != null) config.headers.Authorization = `Bearer ${userData?.jwtToken}`;
		return config;
	});
	axios.interceptors.response.use(
		function(response) {
			return response;
		},
		function(error) {
			if (error.response) {
				console.log(error.response);
			} else {
				TestToken();
			}
			return Promise.reject(error);
		}
	);

	const TestToken = () => {
		fetch(
			'https://localhost:44325/api/connection/testToken',
			{
				headers: {
					Authorization: `Bearer ${userData.jwtToken}`
				}
			},
			[]
		).catch((error) => {
			LogOut();
		});
	};

	return {
		isLogged,
		setIsLogged,
		LogOut,
		userData,
		setUserData,
		LoadUserData,
		SaveUserData
	};
}
