export interface Product {
	id: number,
	priceNetto: number,
	vat: number,
	name: string,
	catalogNumber: string,
	measurementUnits: string,
	description: string,
}
export const DefaultProduct:Product = {
	id: 0,
	priceNetto: 0,
	vat: 0,
	name: '',
	catalogNumber: '',
	measurementUnits: '',
	description: ''
}
