import type { ContactDataSource } from '@/dataSourcesType/contact-data-source';
import type { Contact } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';

export class ContactRepositoryImpl implements ContactRepository {
	contactDataSource: ContactDataSource;

	constructor(contactDataSource: ContactDataSource) {
		this.contactDataSource = contactDataSource;
	}

	async createContact(contact: Contact): Promise<boolean> {
		const result = await this.contactDataSource.create(contact);
		return result;
	}

	async getContacts(): Promise<Contact[]> {
		const result = await this.contactDataSource.getAll();
		return result;
	}
}
