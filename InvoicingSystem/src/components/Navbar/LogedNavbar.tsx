import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './Navbar.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import {
	FileTextOutlined,
	AppstoreAddOutlined,
	TeamOutlined,
	LogoutOutlined,
	UnorderedListOutlined,
	DatabaseOutlined,
	UsergroupAddOutlined
} from '@ant-design/icons';
import { faFileAlt, faCubes, faUser } from '@fortawesome/free-solid-svg-icons';
import Invoices from '../Invoices/Invoices';
import { InvoicePreview } from '../Invoices/InvoicePreview/InvoicePreview';
import InvoiceWizard from '../Invoices/InvoiceWizard/InvoiceWizard';
import InvoiceEditor from '../Invoices/InvoiceEditor/InvoiceEditor';
import Products from '../Products/Products';
import Contractors from '../Contractors/Contractors';
import { ContractorToEmployees } from '../ContractorToEmployees/ContractorToEmployees';
import Users from '../Users/Users';
import { PrivateRoute, DefaultRedirect } from './PrivateRoute';
import { UserDataContext } from '../../contexts/UserDataContext';
import LoginPage from '../Login/loginPage';
import CompanyData from '../CompanyData/CompanyData';
import { UnauthorizedEventListener } from '../Utils/UnauthorizedEventListener';
function InvoiceNavbar() {
	const { Header, Content, Footer, Sider } = Layout;
	const { SubMenu } = Menu;
	const [ collapsed, setCollapsed ] = useState(true);

	const { isLogged, userData, LogOut } = useContext(UserDataContext);

	useEffect(() => {
		UnauthorizedEventListener.on('logout', () => {
			console.log('logout');
		});
	}, []);

	useEffect(() => {
		return () => {
			UnauthorizedEventListener.remove('logout', () => {
				console.log('removed');
			});
		};
	}, []);

	const roleAuthenticate = (roleId: number) => {
		if (userData != null) if (userData.roleId === roleId) return true;
		return false;
	};

	return (
		<Router>
			<Layout style={{ minHeight: '100vh' }}>
				{isLogged && (
					<Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
						<Menu theme="dark" defaultSelectedKeys={[ '1' ]} mode="inline">
							<SubMenu key="sub1" icon={<FileTextOutlined />} title="Faktury">
								<Menu.Item key="sub2">
									Utwórz Fakturę<Link to="/invoice/add" />
								</Menu.Item>
								<Menu.Item key="sub3">
									Lista Faktur<Link to="/list/invoices" />
								</Menu.Item>
							</SubMenu>
							<Menu.Item icon={<AppstoreAddOutlined />} key="sub4">
								Lista Produktów i Usług<Link to="/list/products" />
							</Menu.Item>
							{(roleAuthenticate(1) || roleAuthenticate(2)) && (
								<Menu.Item icon={<TeamOutlined />} key="sub5">
									Kontrahenci<Link to="/list/contractors" />
								</Menu.Item>
							)}

							{(roleAuthenticate(1) || roleAuthenticate(2)) && (
								<Menu.Item icon={<UnorderedListOutlined />} key="sub8">
									Panel Managera<Link to="/contractorToEmployees" />
								</Menu.Item>
							)}
							{roleAuthenticate(1) && (
								<Menu.Item icon={<UsergroupAddOutlined />} key="sub6">
									Pracownicy<Link to="/list/employees" />
								</Menu.Item>
							)}
							{roleAuthenticate(1) && (
								<Menu.Item icon={<DatabaseOutlined />} key="sub7">
									Dane Firmy<Link to="/companyData" />
								</Menu.Item>
							)}

							<Menu.Item
								style={{
									position: 'absolute',
									bottom: '50px'
								}}
								icon={<LogoutOutlined />}
								key="sub9"
							>
								Wyloguj<Link onClick={() => LogOut()} to="/login" />
							</Menu.Item>
						</Menu>
					</Sider>
				)}
				<Layout>
					<Header className="site-layout-background" style={{ padding: 0 }}>
						<Row>
							<Col>
								<h2 className="TitleText">System wspomagający fakturowanie</h2>
							</Col>s
						</Row>
					</Header>
					<Content>
						<div style={{ padding: '0' }}>
							<Route path="/login" component={LoginPage} />
						</div>
						<div style={{ padding: '24px 24px 24px' }}>
							<PrivateRoute path="/list/invoices" component={Invoices} />
							<PrivateRoute path="/list/products" component={Products} />
							<PrivateRoute path="/list/contractors" component={Contractors} />
							<PrivateRoute path="/list/employees" component={Users} />
							<PrivateRoute path="/invoice/add" component={InvoiceWizard} />
							<PrivateRoute path="/invoice/edit" component={InvoiceEditor} />
							<PrivateRoute path="/preview/:id" component={InvoicePreview} />
							<PrivateRoute path="/companyData" component={CompanyData} />
							<PrivateRoute path="/contractorToEmployees" component={ContractorToEmployees} />
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }} />
				</Layout>
			</Layout>
		</Router>
	);
}

export default InvoiceNavbar;
