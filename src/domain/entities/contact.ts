export interface Contact {
	_id: string;
	email: string;
	firstName: string;
	surname: string;
}

export type ContactWithoutId = Omit<Contact, '_id'>;
