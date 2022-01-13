export interface PaymentViewModel {
	id: number;
	name: string;
	dateNeeded: boolean;
}
export const DefaultPaymentViewModel: PaymentViewModel = {
	id: 0,
	name: '',
	dateNeeded: false
};
