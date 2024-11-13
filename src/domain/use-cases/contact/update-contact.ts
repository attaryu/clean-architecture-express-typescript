import { Contact } from '@/entities/contact';
import { ContactRepository } from '@/repositoriesType/contact-repository';
import type { UpdateContactUseCase } from '@/useCasesType/contact/update-contact';

export class UpdateContact implements UpdateContactUseCase {
	private readonly contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(id: Contact['_id'], contact: Partial<Contact>): Promise<boolean> {
		const result = await this.contactRepository.updateContact(id, contact);
		return result !== null;
	}
}
