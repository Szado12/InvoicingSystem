import React, { useEffect, useState, useContext } from 'react';

import { UserDataContext } from '../../contexts/UserDataContext';
import useFetch from 'use-http';
import { FormControl } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const ContractorString = [ 'kontrahentów', 'kontrahenta', 'companyName' ];
const RoleString = [ 'ról', 'role', 'name' ];
const ProductString = [ 'produktów i usług', 'produkt lub usługę', 'name' ];
const PaymentMethodStrings = [ 'sposoby płatności', 'sposób płatności', 'name' ];
const ManagerStrings = [ 'managerów', 'managera', 'firstName' ];

const selectedValue = (options: any[], object: any) => {
	try {
		if (options.length > 0) {
			return options.filter((x) => x.id === object.id);
		}
		return null;
	} catch (error) {
		return null;
	}
};

const GenericTypeahead = (prop: { onChange: any, selected: any, url: string, type: string, disabled: boolean }) => {
	const { userData } = useContext(UserDataContext);
	var strings = ContractorString;
	switch (prop.type) {
		case 'contractor':
			strings = ContractorString;
			break;
		case 'role':
			strings = RoleString;
			break;
		case 'product':
			strings = ProductString;
			break;
		case 'paymentMethod':
			strings = PaymentMethodStrings;
			break;
		case 'manager':
			strings = ManagerStrings;
			break;
		default:
			break;
	}

	const [ placeholder, setPlaceholder ] = useState('Ładowanie ' + strings[0] + '...');
	const { loading, error, data: options } = useFetch(
		prop.url,
		{
			headers: {
				Authorization: `Bearer ${userData.jwtToken}`
			}
		},
		[]
	);
	useEffect(
		() => {
			if (error) setPlaceholder('Wystąpił błąd');
			else if (loading) setPlaceholder('Ładowanie ' + strings[0] + '...');
			else setPlaceholder('Wyszukaj ' + strings[1] + '...');
		},
		[ error, loading ]
	);

	return (
		<Typeahead
			disabled={error || loading || prop.disabled}
			as={FormControl}
			id="inputCategory"
			labelKey={strings[2]}
			onChange={(selected) => prop.onChange(selected)}
			options={options || []}
			placeholder={placeholder}
			selected={selectedValue(options || [], prop.selected)}
		/>
	);
};

export default GenericTypeahead;
