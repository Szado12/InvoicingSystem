import React, { useContext} from 'react';
import { Col, Row, Button} from 'antd';
import GenericTypeahead from '../../Utils/GenericTypeahead';
import { DefaultProduct } from '../../Utils/Product';
import { InvoiceWizardContext } from '../../../contexts/InvoiceWizardContext';
import 'antd/dist/antd.css';
import { CopyOutlined, DeleteOutlined} from '@ant-design/icons';
import { InvoiceRow, calculatePriceNettoDiscounted, calculateBruttoVatPrice, calculateSumVatPrice, calculateSumNettoPrice } from '../../Utils/InvoiceRow';
import './InvoiceWizard.css';

export const InvoiceRowWizard = (prop:{invoiceRow:InvoiceRow,index:number}) => {
	const {EditRow, CloneRow,RemoveRow} = useContext(InvoiceWizardContext);
	const SetProduct = (product: any) => {
		try {
			if(product.length > 0)
				EditRow(prop.index,{...prop.invoiceRow,'product': product[0]});
			else
				EditRow(prop.index,{...prop.invoiceRow,'product': DefaultProduct});
		} catch (e) {
			console.log(e);
		}
	};

	const SetDiscount = (discount: number) => {
		EditRow(prop.index,{...prop.invoiceRow,'discount': discount});
	};
	const SetProductNumber = (productNumber: number) => {
		EditRow(prop.index,{...prop.invoiceRow,'numberOfProducts': productNumber});
	};
	const sumNettoPrice = calculateSumNettoPrice(prop.invoiceRow);
	const priceNettoDiscount = calculatePriceNettoDiscounted(prop.invoiceRow);
	const sumVatPrice = calculateSumVatPrice(prop.invoiceRow);
	const sumBruttoPrice = calculateBruttoVatPrice(prop.invoiceRow);

	return (
		<div>
			<Row>
				<Col xs={23}>
					<Row className={'InvoicePositionCardRow'}> 
						<Col xs={8} className={'InvoicePositionCardRowTypeahead'}>
							<GenericTypeahead onChange={SetProduct} selected={prop.invoiceRow.product} url={'https://localhost:44325/api/products'} type={'product'}/>
						</Col>
						<Col xs={2}>
							<input
								className={`form-control`}
								type="number"
								value={prop.invoiceRow.numberOfProducts}
								onChange={(event) => SetProductNumber(Number(event.target.value))}
							/>
						</Col>
						<Col xs={2}>
							<input
								className={`form-control`}
								type="number"
								value={prop.invoiceRow.discount*100}
								onChange={(event) => SetDiscount(Number(event.target.value)/100)}
							/>
						</Col>
						<Col xs={2}>
							<input disabled className={`form-control`} value={prop.invoiceRow.product.priceNetto.toFixed(2)} />
						</Col>
						<Col xs={2}>
							<input disabled className={`form-control`} value={priceNettoDiscount.toFixed(2)} />
						</Col>
						<Col xs={2}>
							<input disabled className={`form-control`} value={sumNettoPrice.toFixed(2)} />
						</Col>
						<Col xs={2}>
							<input disabled className={`form-control`} value={prop.invoiceRow.product?.vat} />
						</Col>
						<Col xs={2}>
							<input disabled className={`form-control`} value={sumVatPrice.toFixed(2)} />
						</Col>
						<Col xs={2}>
							<input disabled className={`form-control`} value={sumBruttoPrice.toFixed(2)} />
						</Col>
					</Row> 
				</Col>
				<Col xs={1}>
					<Row className={'InvoiceRowWizardButtons'}>
						<Col xs={12}><Button onClick={()=>CloneRow(prop.index)} style={{ background: "#ffc107", borderColor: "#ffc107" }} type="primary" icon={<CopyOutlined style={{ fontSize: '1.2em'}}/>}/></Col>
						<Col xs={12}><Button onClick={()=>RemoveRow(prop.index)} danger type="primary" icon={<DeleteOutlined style={{ fontSize: '1.2em'}}/>}/></Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
	
};
