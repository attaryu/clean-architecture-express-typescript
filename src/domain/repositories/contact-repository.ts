import type { ContactDataSource } from '@/dataSourcesType/contact-data-source';
import type { Contact, ContactWithoutId } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';

export class ContactRepositoryImpl implements ContactRepository {
	contactDataSource: ContactDataSource;

	constructor(contactDataSource: ContactDataSource) {
		this.contactDataSource = contactDataSource;
	}

	async getContacts(): Promise<Contact[]> {
		const result = await this.contactDataSource.getAll();
		return result;
	}

	async getContact(id: Contact['_id']): Promise<Contact | null> {
		const result = await this.contactDataSource.get(id);
		return result;
	}

	async createContact(contact: ContactWithoutId): Promise<boolean> {
		const result = await this.contactDataSource.create(contact);
		return result;
	}

	async updateContact(
		id: Contact['_id'],
		contact: Partial<Contact>
	): Promise<boolean> {
		const result = await this.contactDataSource.update(id, contact);
		return result;
	}

	async deleteContact(id: Contact['_id']): Promise<boolean> {
		const result = await this.contactDataSource.delete(id);
		return result;
	}
}
