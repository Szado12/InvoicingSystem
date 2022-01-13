import React from 'react';
import ReactDOM from 'react-dom';
import { UserFilterProvider } from '../../contexts/UserTableFilterContext';
import UsersToolbar from './UsersToolbar';
import UsersList from './UsersList';
import { Container } from 'react-bootstrap';
import { Divider } from 'antd';
import './Users.css';

export default function Users() {
	return (
		<UserFilterProvider>
			<h2>Pracownicy</h2>
			<Divider />

			<div className={'UserList'}>
				<UsersToolbar />
				<UsersList />
			</div>
		</UserFilterProvider>
	);
}
