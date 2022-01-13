import { Role, DefaultRole } from './Role';

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	role: Role;
	manager: User | null;
	fired: boolean;
}

export const DefaultUser: User = {
	id: 0,
	firstName: '',
	lastName: '',
	role: DefaultRole,
	manager: null,
	fired: false
};
