import type { Contact } from '@/entities/contact';

export interface ContactDataSource {
	create(contact: Contact): Promise<boolean>;
	getAll(): Promise<Contact[]>;
}
