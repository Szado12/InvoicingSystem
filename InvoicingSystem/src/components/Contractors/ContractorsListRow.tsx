import React, { useContext, useState } from 'react';
import { ContractorFilterContext } from '../../contexts/ContractorTableFilterContext'
import ContractorWizard from './ContractorWizard'
import DeleteContractorModal from './DeleteContractorModal'
import { Accordion, Card, Row, Col, Button, } from 'react-bootstrap';
import { Contractor } from '../Utils/Contractor';
import '../Utils/ListButtons.css';
import './Contractors.css'
function IsDisplayed(contractor:Contractor) {
    const {showByCity,showByNIP,showByCompanyName
    } = useContext(ContractorFilterContext);

    var display = contractor.city.toLowerCase().includes(showByCity.toLowerCase());
    if (display)
        display = contractor.nip.toLowerCase().includes(showByNIP.toLowerCase());
    if (display)
        display = contractor.companyName.toLowerCase().includes(showByCompanyName.toLowerCase());
    return display;
}

function ReturnContractorRowForExpandedView(prop:{FieldTitle: any, FieldValue :any}) {
    return (
        
        <Col xs={12} md={6}>
            <Row noGutters className='d-flex justify-content-center align-items-center'>
                <Col xs={4}><b>{prop.FieldTitle}:</b></Col>
                <Col xs={8} className='d-flex justify-content-start'>
                    {prop.FieldValue}
                </Col>
            </Row>
        </Col>
    );
}

export default function ContractorsListRow(prop:{ ContractorData:Contractor, Index:number, RefreshFunc:()=>void}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    console.log(showEdit,showDelete);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleShowDelete = () => setShowDelete(true);
    return (
        <>
            <Accordion>
                <Card hidden={!IsDisplayed(prop.ContractorData)}>
                    <Accordion.Toggle as={Card.Header} className={`p-0 m-0 container-header container-collapse-header ContractorRow`} eventKey={prop.Index.toString()}>
                        <Row>
                            <Col xs={6}>{prop.ContractorData.companyName}</Col>
                            <Col xs={4}>{prop.ContractorData.nip}</Col>
                            <Col xs={2}>{prop.ContractorData.city}</Col>
                        </Row>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={prop.Index.toString()}>
                        <Row noGutters>
                                <Row>
                                        <ReturnContractorRowForExpandedView FieldTitle="Nazwa firmy" FieldValue={prop.ContractorData.companyName} key={"1asd"}/>
                                        <ReturnContractorRowForExpandedView FieldTitle="Numer NIP" FieldValue={prop.ContractorData.nip} />
                                        <ReturnContractorRowForExpandedView FieldTitle="Adres" FieldValue={prop.ContractorData.address + " " +prop.ContractorData.city} />
                                        <ReturnContractorRowForExpandedView FieldTitle="Kod pocztowy" FieldValue={prop.ContractorData.zipCode + " " +prop.ContractorData.city} />
                                    
                                </Row>
                                <Row>
                                    <Col xs={12} sm className="my-1 d-flex justify-content-center EditorButtonsStyle">
                                        <Button
                                            variant='outline-success'
                                            onClick={() => handleShowEdit()}>
                                            Edytuj
                                        </Button>
                                        <Button 
                                            variant='outline-danger'
                                            onClick={() => handleShowDelete()}>
                                            Usuń
                                        </Button>
                                    </Col>
                                </Row>
                        </Row>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <ContractorWizard show={showEdit} handleClose={handleCloseEdit} ContractorData={prop.ContractorData} RefreshFunc={prop.RefreshFunc} action={"edit"}/>
            <DeleteContractorModal show={showDelete} handleClose={handleCloseDelete} ContractorData={prop.ContractorData} RefreshFunc={prop.RefreshFunc} />
        </>
    );
}

