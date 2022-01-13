import react, {useState} from 'react';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DefaultUser, User } from '../Utils/User';
import { Col, Row, Button, Divider } from 'antd';
import UserWizard from './UserWizard'
import "./Users.css";
export function AddUser(prop:{RefreshFunc:()=>void}){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose= () => setShow(false);

    return(
        <>
			<Row>
				<Col xs={24} style={{textAlign:'center'}}>
					<button className={'AddUserButton'} onClick={() => handleShow()}><FontAwesomeIcon icon={faPlusSquare} /> Dodaj pracownika</button>
				</Col>
			</Row>
            <UserWizard show={show} handleClose={handleClose} UserData={DefaultUser} RefreshFunc={prop.RefreshFunc} action={"add"}/>
        </>
    )
}