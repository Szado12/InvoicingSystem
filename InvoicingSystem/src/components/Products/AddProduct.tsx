import react, {useState} from 'react';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DefaultProduct } from '../Utils/Product';
import { Col, Row, Button, Divider } from 'antd';
import ProductWizard from './ProductWizard'
import "./Products.css";
export function AddProduct(prop:{RefreshFunc:()=>void}){
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose= () => setShow(false);

    return(
        <>
			<Row>
				<Col xs={24} style={{textAlign:'center'}}>
					<button className={'AddProductButton'} onClick={() => handleShow()}><FontAwesomeIcon icon={faPlusSquare} /> Dodaj produkt</button>
				</Col>
			</Row>
            <ProductWizard show={show} handleClose={handleClose} ProductData={DefaultProduct} RefreshFunc={prop.RefreshFunc} action={"add"}/>
        </>
    )
}