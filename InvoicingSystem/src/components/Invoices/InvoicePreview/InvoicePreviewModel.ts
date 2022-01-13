import { InvoiceRow } from '../../Utils/InvoiceRow';
import { PaymentViewModel } from '../../Utils/PaymentViewModel';
import { Contractor } from '../../Utils/Contractor';
import { CompanyDataModel } from '../../CompanyData/CompanyDataModel';
import { User } from '../../Utils/User';

export interface InvoicePreviewModel {
	id: number;
	invoiceNumber: string;
	companyData: CompanyDataModel;
	contractor: Contractor;
	employee: User;
	paymentDate: Date;
	paymentMethod: PaymentViewModel;
	invoiceRows: InvoiceRow[];
}
