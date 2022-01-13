import {Product,DefaultProduct} from './Product'

export interface InvoiceRow {
	id: number;
	product: Product;
	numberOfProducts: number;
	discount: number;
}
export const DefaultInvoiceRow:InvoiceRow = {
	id:0,
	product: DefaultProduct,
	numberOfProducts: 0,
	discount: 0
}
export function calculateSumNettoPrice(invoiceRow:InvoiceRow) {
	return Number((invoiceRow.numberOfProducts * calculatePriceNettoDiscounted(invoiceRow)).toFixed(2));
}
export function calculateSumVatPrice(invoiceRow:InvoiceRow) {
	return Number((calculatePriceNettoDiscounted(invoiceRow)  * invoiceRow.numberOfProducts * (invoiceRow.product.vat/100)).toFixed(2));
}
export function calculateBruttoVatPrice(invoiceRow:InvoiceRow) {
	return Number((calculateSumNettoPrice(invoiceRow) + calculateSumVatPrice(invoiceRow)).toFixed(2));
}
export function calculatePriceNettoDiscounted(invoiceRow:InvoiceRow) {
	return Number((invoiceRow.product.priceNetto * (1 - invoiceRow.discount)).toFixed(2));
}
