import type { Contact } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';
import type { GetAllContactsUseCase } from '@/useCasesType/contact/get-all-contacts';

export class GetAllContacts implements GetAllContactsUseCase {
	contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(): Promise<Contact[]> {
		const result = await this.contactRepository.getContacts();
		return result;
	}
}
