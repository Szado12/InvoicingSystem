import React from 'react';
import { PaymentViewModel } from '../../Utils/PaymentViewModel';
import { Col, Row, Divider } from 'antd';
import * as moment from 'moment';
export function InvoicePreviewPayment(prop: { payment: PaymentViewModel; paymentDate: Date }) {
	return (
		<Col sm={24} md={12}>
			<Row>
				<h3>Sposób płatności</h3>
				<Divider />
			</Row>
			<Row>
				<Col xs={24}>
					<h6>{prop.payment.name}</h6>
				</Col>
			</Row>
			<Row>
				<Col xs={6}>Termin płatności:</Col>
				<Col xs={18}>{moment(prop.paymentDate).format('DD.MM.YYYY')}</Col>
			</Row>
		</Col>
	);
}
