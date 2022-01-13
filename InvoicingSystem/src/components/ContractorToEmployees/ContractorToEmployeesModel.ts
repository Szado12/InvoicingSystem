import { ContractorInfo } from './ContractorInfo';
import { EmployeeInfo } from './EmployeeInfo';

export interface ContractorToEmployeesModel {
	Employees: EmployeeName[];
	Contractors: ContractorInfo[];
}
