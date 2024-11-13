import type { Contact, ContactWithoutId } from '@/entities/contact';

export interface ContactDataSource {
	create(contact: ContactWithoutId): Promise<boolean>;
	getAll(): Promise<Contact[]>;
	get(id: Contact['_id']): Promise<Contact | null>;
	update(id: Contact['_id'], contact: Partial<ContactWithoutId>): Promise<boolean>;
	delete(id: Contact['_id']): Promise<boolean>;
}
