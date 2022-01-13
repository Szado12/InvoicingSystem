import React, { useContext, useEffect, useState } from 'react';
import { Container, Col, Row, Accordion } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import useFetch from 'use-http';
import UsersListRow from './UsersListRow';
import axios from 'axios';
import { User } from '../Utils/User';
import { AddUser } from './AddUser';

export default function UsersList() {
	const [ users, setUsers ] = useState<User[]>([]);
	const [ loading, setLoading ] = useState(true);

	const RefreshFunc = () => {
		GetUsers();
	};

	const GetUsers = () => {
		console.log('ref');
		axios.get<User[]>('https://localhost:44325/api/users/list').then((response) => {
			setUsers(response.data);
			setLoading(false);
		});
	};

	useEffect(() => {
		GetUsers();
	}, []);
	var content;
	if (loading) {
		content = 'ładowanie produktów';
	} else {
		console.log(users);
		content = users.map((user, index) => (
			<UsersListRow UserData={user} Index={index + 1} RefreshFunc={RefreshFunc} key={"UserListRow"+index}/>
		));
	}
	return (
		<>
		<AddUser RefreshFunc={RefreshFunc}/>
		<Row className="d-flex justify-content-center align-items-center">
				<Col xs={3}>Imię pracownika</Col>
				<Col xs={3}>Nazwisko pracownika</Col>
				<Col xs={2}>Rola</Col>
				<Col xs={3}>Manager</Col>
				<Col xs={1}>Zwolniony</Col>
		</Row>
		<Accordion>{content}</Accordion>
		</>
	);
}
