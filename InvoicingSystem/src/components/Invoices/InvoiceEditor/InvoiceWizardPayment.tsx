import React, { useContext, useState } from 'react';
import GenericTypeahead from '../../Utils/GenericTypeahead';
import { InvoiceWizardContext } from '../../../contexts/InvoiceWizardContext';
import { PaymentViewModel, DefaultPaymentViewModel } from '../../Utils/PaymentViewModel';
import { Col, Row, Divider } from 'antd';
import DatePicker from 'react-datepicker';
import pl from 'date-fns/locale/pl';

export function InvoiceWizardPayment() {
	const { invoiceModel, SetPaymentMethodId, SetPaymentDate } = useContext(InvoiceWizardContext);
	const [ payment, setPayment ] = useState<PaymentViewModel>({ id: invoiceModel.paymentMethodId, name: '' });

	const SetPayment = (payment: any) => {
		try {
			if (payment.length > 0) {
				SetPaymentMethodId(payment[0].id);
				setPayment(payment[0]);
				if (!payment[0].dateNeeded) SetPaymentDate(new Date());
			} else setPayment(DefaultPaymentViewModel);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Col sm={24} md={12} style={{ fontSize: '1.2em' }}>
			<Row>
				<h3>Sposób płatności</h3>
				<Divider />
			</Row>
			<Row>
				<Col xs={24}>
					<GenericTypeahead
						onChange={SetPayment}
						selected={payment}
						url={`https://localhost:44325/api/paymentMethods`}
						type={'paymentMethod'}
					/>
				</Col>
			</Row>
			<Row style={{ paddingTop: '10px' }}>
				<Col xs={4} style={{ paddingTop: '6px' }}>
					Termin płatności:
				</Col>
				{console.log(invoiceModel.paymentDate)}
				<Col xs={20}>
					<DatePicker
						disabled={!payment.dateNeeded}
						selected={new Date(invoiceModel.paymentDate)}
						className="form-control"
						onChange={(date) => SetPaymentDate(date)}
						dateFormat="dd.MM.yyyy"
						locale={pl}
					/>
				</Col>
			</Row>
		</Col>
	);
}
