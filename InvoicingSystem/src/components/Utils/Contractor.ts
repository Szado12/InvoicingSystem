export interface Contractor {
	id: number;
	companyName: string;
	address: string;
	city: string;
	zipCode: string;
	nip: string;
};

export const DefaultContractor:Contractor = {
	id:0,
	companyName:'',
	city:'',
	address: '',
	zipCode: '',
	nip: ''
};
