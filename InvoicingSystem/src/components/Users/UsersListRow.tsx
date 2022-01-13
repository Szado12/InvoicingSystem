import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { UserFilterContext } from '../../contexts/UserTableFilterContext'
import UserWizard from './UserWizard'
import DeleteUserModal from './DeleteUserModal'
import { Accordion, Card, Row, Col, Button, Container, Modal } from 'react-bootstrap';
import { User } from '../Utils/User';
import './Users.css'
import '../Utils/ListButtons.css';

function IsDisplayed(user:User) {
    const {
		showByFirstName,
		showByLastName,
		showByRole,
		showByManagerName,
        showByStatus
    } = useContext(UserFilterContext);

    var display = user.firstName.toLowerCase().includes(showByFirstName.toLowerCase());
    if (display)
        display = user.lastName.toLowerCase().includes(showByLastName.toLowerCase());

    if (display && showByRole != null){
        if(showByRole.length > 0)
            display = user.role.id === showByRole[0].id;
    }
    
    if(display)
    {
        switch (showByStatus) {
            case 1:   
                break;
            case 2:
                display = user.fired;
                break;
            case 3:
                display = !user.fired;
                break;
            default:
                break;
        }
    }

    if (display && showByManagerName != null){
        if(showByManagerName.length > 0){
            display = false;
            if(user.manager != null)
                if(showByManagerName[0] != null){
                    return user.manager.id === showByManagerName[0].id;
                }
        }
    }
        
    return display;
}

function ReturnUserRowForExpandedView(prop:{FieldTitle: any, FieldValue :any}) {
    return (
        
        <Col xs={12} md={6}>
            <Row noGutters className='d-flex justify-content-center align-items-center'>
                <Col xs={6}><b>{prop.FieldTitle}:</b></Col>
                <Col xs={6} className='d-flex justify-content-start'>
                    {prop.FieldValue}
                </Col>
            </Row>
        </Col>
    );
}

export default function UsersListRow(prop:{ UserData:User, Index:number, RefreshFunc:()=>void}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleShowDelete = () => setShowDelete(true);
    return (
        <>
            <Accordion>
                <Card hidden={!IsDisplayed(prop.UserData)}>
                    <Accordion.Toggle as={Card.Header} className={`p-0 m-0 container-header container-collapse-header UserRow`} eventKey={prop.Index.toString()}>
                        <Row>
                            <Col xs={3}>{prop.UserData.firstName}</Col>
                            <Col xs={3}>{prop.UserData.lastName}</Col>
                            <Col xs={2}>{prop.UserData.role.name}</Col>
                            <Col xs={3}>{prop.UserData.manager != null ? prop.UserData.manager.firstName+" "+prop.UserData.manager.lastName : "Brak"}</Col>
                            <Col xs={1}>{prop.UserData.fired?"Tak":"Nie"}</Col>
                        </Row>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={prop.Index.toString()}>
                        <Row noGutters>
                                <Row>
                                    <ReturnUserRowForExpandedView FieldTitle="Imię i naziwsko pracownika" FieldValue={prop.UserData.firstName+" "+prop.UserData.lastName} key={"1asd"}/>
                                    <ReturnUserRowForExpandedView FieldTitle="Rola" FieldValue={prop.UserData.role.name} />
                                    <ReturnUserRowForExpandedView FieldTitle="Manager" FieldValue={prop.UserData.role.name} />
                                    <ReturnUserRowForExpandedView FieldTitle="Zwolniony" FieldValue={prop.UserData.fired?"Tak":"Nie"} />
                                </Row>
                                <Row>
                                    <Col xs={12} sm className='my-1 d-flex justify-content-center EditorButtonsStyle'>
                                        <Button
                                            variant='outline-success'
                                            onClick={() => handleShowEdit()}>
                                            Edytuj
                                        </Button>
                                        <Button 
                                            variant='outline-danger'
                                            onClick={() => handleShowDelete()}>
                                            Zwolnij
                                        </Button>
                                    </Col>
                                </Row>
                        </Row>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <UserWizard show={showEdit} handleClose={handleCloseEdit} UserData={prop.UserData} RefreshFunc={prop.RefreshFunc} action={"edit"}/>
            <DeleteUserModal show={showDelete} handleClose={handleCloseDelete} UserData={prop.UserData} RefreshFunc={prop.RefreshFunc} />
        </>
    );
}

