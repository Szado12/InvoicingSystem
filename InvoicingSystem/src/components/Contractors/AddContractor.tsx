import React, {useState} from 'react';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DefaultContractor } from '../Utils/Contractor';
import { Col, Row} from 'antd';
import ContractorWizard from './ContractorWizard'
import "./Contractors.css";
export function AddContractor(prop:{RefreshFunc:()=>void}){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose= () => setShow(false);

    return(
        <>
			<Row>
				<Col xs={24} style={{textAlign:'center'}}>
					<button className={'AddContractorButton'} onClick={() => handleShow()}><FontAwesomeIcon icon={faPlusSquare} /> Dodaj kontrahenta</button>
				</Col>
			</Row>
            <ContractorWizard show={show} handleClose={handleClose} ContractorData={DefaultContractor} RefreshFunc={prop.RefreshFunc} action={"add"}/>
        </>
    )
}