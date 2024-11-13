import type { Contact, ContactWithoutId } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';
import type { CreateContactUseCase } from '@/useCasesType/contact/create-contact';

export class CreateContact implements CreateContactUseCase {
	contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(contact: ContactWithoutId): Promise<boolean> {
		const result = await this.contactRepository.createContact(contact);
		return result;
	}
}
