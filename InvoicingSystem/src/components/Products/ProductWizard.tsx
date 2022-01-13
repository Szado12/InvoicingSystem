import React,{useState} from 'react';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import { Product } from '../Utils/Product';
import axios from 'axios';
import { Input } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

function ReturnProductRowForCreatorView(prop:{ FieldTitle:string, FieldValue:any, type:string, setter:any, propertyName:string}) {
    return (
        <Row noGutters className='d-flex justify-content-center align-items-center'>
            <Col xs={4}><b>{prop.FieldTitle}:</b></Col>
            <Col xs={8}>
                <Input type={prop.type} className={'flex-row w-100'} value={prop.FieldValue} onChange={(event)=>prop.setter(prop.propertyName,event.target.value)}/>
            </Col>
        </Row>
    );
}
function ReturnProductDescriptionCreatorView(prop:{ FieldValue:string, setter:any}) {

    const { TextArea } = Input;
    return (
        <>
        <Row noGutters className='d-flex justify-content-center align-items-center'>
            <Col xs={12}><b>Opis:</b></Col>
        </Row>
        <Row>
            <Col xs={12}>
                <TextArea rows={4} className={'flex-row w-100'} value={prop.FieldValue} onChange={(event)=>prop.setter("description",event.target.value)}/>
            </Col>
        </Row>
        </>
    );
}

export default function ProductWizard(prop:{ show:boolean, handleClose:()=>void, ProductData:Product, RefreshFunc:()=>void, action:string}) {
    const productCopy = cloneDeep(prop.ProductData);
    const [product,setProduct] = useState(productCopy);
    const setChangeProduct = (property:any,newValue:string|number) =>{
        setProduct({...product, [property]: newValue});
    };

    const postProduct = () => {
        axios
    		.post("https://localhost:44325/api/products?action="+prop.action,{...product})
    		.then(response => {
     			prop.RefreshFunc();
                prop.handleClose();
    		});
    }

    const backToDefaultValue = () => {
        prop.handleClose();
        const defaultProduct = cloneDeep(prop.ProductData);
        setProduct(defaultProduct);
    }

    return (
        <Modal  show={prop.show} onHide={backToDefaultValue}>
            <Modal.Header>
                <Modal.Title>{prop.action==="edit"?"Edycja " + (product.catalogNumber===""?"usługi " + prop.ProductData.name : "produktu ") + product.catalogNumber :"Dodanie produktu/usługi"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={'justify-content-center'}>
                <Col xs={12}>
                    <ReturnProductRowForCreatorView FieldTitle="Numer katalogowy" type="text" FieldValue={product.catalogNumber} setter={setChangeProduct} propertyName = {"catalogNumber"}/>
                    <ReturnProductRowForCreatorView FieldTitle="Nazwa produktu" type="text" FieldValue={product.name} setter={setChangeProduct} propertyName = {"name"}/>
                    <ReturnProductRowForCreatorView FieldTitle="Cena" type="number" FieldValue={product.priceNetto} setter={setChangeProduct} propertyName = {"priceNetto"}/>
                    <ReturnProductRowForCreatorView FieldTitle="Jednostka miary" type="text" FieldValue={product.measurementUnits} setter={setChangeProduct} propertyName = {"measurementUnits"}/>
                    <ReturnProductRowForCreatorView FieldTitle="Stawka podatku vat [%]" type="number" FieldValue={product.vat} setter={setChangeProduct} propertyName = {"vat"}/>
                    <ReturnProductDescriptionCreatorView FieldValue={product.description} setter={setChangeProduct}/>
                </Col>
            </Modal.Body>
            <Modal.Footer className={'justify-content-center'}>
                <Button className='w-25' variant='outline-success' onClick={()=> postProduct()}>
                    Zapisz
                </Button>
                <Button className='w-25' variant='outline-danger'
                    onClick={() => backToDefaultValue()}>
                    Anuluj
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

