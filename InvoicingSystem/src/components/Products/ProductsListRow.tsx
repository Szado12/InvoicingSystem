import React, { useContext, useState } from 'react';
import { ProductFilterContext } from '../../contexts/ProductTableFilterContext'
import ProductWizard from './ProductWizard'
import DeleteProductModal from './DeleteProductModal'
import { Accordion, Card, Row, Col, Button} from 'react-bootstrap';
import { Product } from '../Utils/Product';
import '../Utils/ListButtons.css';

function IsDisplayed(product:Product) {
    const [showByProductNumber, ,
        showByProductName, ,
        showByProductPrice, ,
    ] = useContext(ProductFilterContext);
    var display = product.catalogNumber.toLowerCase().includes(showByProductNumber.toLowerCase());
    if (display)
        display = product.name.toLowerCase().includes(showByProductName.toLowerCase());
    if (display && showByProductPrice[0] !== null)
        display = showByProductPrice[0] <= product.priceNetto;
    if (display && showByProductPrice[1] !== null)
        display = showByProductPrice[1] >= product.priceNetto;
    return display;
}

function ReturnProductRowForExpandedView(prop:{FieldTitle: any, FieldValue :any}) {
    return (
        <Row noGutters className='d-flex justify-content-center align-items-center'>
            <Col xs={4}><b>{prop.FieldTitle}:</b></Col>
            <Col xs={8} className='d-flex justify-content-start'>
                {prop.FieldValue}
            </Col>
        </Row>
    );
}

export default function ProductsListRow(prop:{ ProductData:Product, Index:number, RefreshFunc:()=>void}) {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleShowDelete = () => setShowDelete(true);
    return (
        <>
            <Accordion>
                <Card hidden={!IsDisplayed(prop.ProductData)}>
                    <Accordion.Toggle as={Card.Header} className={`p-0 m-0 container-header container-collapse-header`} eventKey={prop.Index.toString()}>
                        <Row>
                            <Col xs={2}>{prop.ProductData.catalogNumber}</Col>
                            <Col xs={8}>{prop.ProductData.name}</Col>
                            <Col xs={2}>{prop.ProductData.priceNetto.toFixed(2)} PLN</Col>
                        </Row>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey={prop.Index.toString()}>
                        <Row noGutters>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <ReturnProductRowForExpandedView FieldTitle="Numer katalogowy" FieldValue={prop.ProductData.catalogNumber} key={"1asd"}/>
                                        <ReturnProductRowForExpandedView FieldTitle="Nazwa produktu" FieldValue={prop.ProductData.name} />
                                        <ReturnProductRowForExpandedView FieldTitle="Cena" FieldValue={prop.ProductData.priceNetto} />
                                        <ReturnProductRowForExpandedView FieldTitle="Jednostka miary" FieldValue={prop.ProductData.measurementUnits} />
                                        <ReturnProductRowForExpandedView FieldTitle="Stawka podatku vat" FieldValue={prop.ProductData.vat + "%"} />
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Row>
                                            <Col xs={12}>
                                            <b>Opis:</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                            {prop.ProductData.description}
                                            </Col>
                                        </Row>
                                    </Col>
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
                                            Usuń
                                        </Button>
                                    </Col>
                                </Row>
                        </Row>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            <ProductWizard show={showEdit} handleClose={handleCloseEdit} ProductData={prop.ProductData} RefreshFunc={prop.RefreshFunc} action={"edit"}/>
            <DeleteProductModal show={showDelete} handleClose={handleCloseDelete} ProductData={prop.ProductData} RefreshFunc={prop.RefreshFunc} />
        </>
    );
}

