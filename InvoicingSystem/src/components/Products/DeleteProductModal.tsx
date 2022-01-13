import React from 'react';
import { Product } from '../Utils/Product';
import axios from 'axios';
import { Col, Row, Modal, Button } from 'react-bootstrap';

export default function DeleteProductModal(prop:{ show:boolean, handleClose:()=>void, ProductData:Product, RefreshFunc:()=>void}){

    const deleteProduct = () =>{
        axios
    		.delete("https://localhost:44325/api/products?id="+prop.ProductData.id,{})
    		.then(response => {
     			prop.RefreshFunc();
                prop.handleClose();
    		});
    }
    //Todo: add call to api
    return (
        <Modal style = {{width:'100%'}} show={prop.show} onHide={prop.handleClose}>
            <Modal.Header>
                <Modal.Title>Usuwanie produktu: {prop.ProductData.catalogNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'justify-content-center'}>
                <Col xs={12}>
                    Czy na pewno chcesz usunąć produkt {prop.ProductData.catalogNumber}?
                </Col>
            </Modal.Body>
            <Modal.Footer className={'justify-content-center'}>
                <Button className='w-25' variant='outline-danger'
                onClick={()=> deleteProduct()}>
                    Usuń 
                </Button>
                <Button className='w-25' variant='outline-success' 
                onClick={() => prop.handleClose()}>
                    Anuluj
                </Button>
            </Modal.Footer>
        </Modal>
    );
}