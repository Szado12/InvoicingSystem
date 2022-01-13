import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Container, Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserDataContext } from '../../contexts/UserDataContext';
import './loginPage.css';
import axios from 'axios';

export default function LoginPage() {
	const [ password, setPassword ] = useState<string>('');
	const [ login, setLogin ] = useState<string>('');
	const [ error, setError ] = useState<string>('');

	const { SaveUserData } = useContext(UserDataContext);

	let history = useHistory();
	let forbiddenChars = /[';"]/g;

	const sendUserData = () => {
		if (login === '' || forbiddenChars.test(login)) {
			setError('Błędny login');
			return;
		}
		if (password === '') {
			setError('Błędne hasło');
			return;
		}
		const data = {
			Login: login,
			Password: password
		};
		axios
			.post('https://localhost:44325/api/users/login', data, {})
			.then((response) => {
				SaveUserData(response.data);
				history.push('/list/invoices');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className={'loginPage'}>
			<div className={'loginPageCard'}>
				<Form>
					{error != '' && (
						<div style={{ color: 'red' }}>
							<b>{error}</b>
						</div>
					)}
					<Form.Group className="mb-3" controlId="formBasicLogin">
						<Form.Label>Login</Form.Label>
						<Form.Control
							type="login"
							value={login}
							onChange={(event) => setLogin(event.target.value)}
							placeholder="Wpisz login"
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Hasło</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							placeholder="Wpisz hasło"
						/>
					</Form.Group>
					<div className={'loginButton'}>
						<Button variant="primary" onClick={() => sendUserData()}>
							Zaloguj
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
}
