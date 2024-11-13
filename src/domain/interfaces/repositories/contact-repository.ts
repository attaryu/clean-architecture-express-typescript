import type { Contact, ContactWithoutId } from '@/entities/contact';

export interface ContactRepository {
	createContact(contact: ContactWithoutId): Promise<boolean>;

	getContacts(): Promise<Contact[]>;

	getContact(id: Contact['_id']): Promise<Contact | null>;

	updateContact(
		id: Contact['_id'],
		contact: Partial<ContactWithoutId>
	): Promise<boolean>;

	deleteContact(id: Contact['_id']): Promise<boolean>;
}
