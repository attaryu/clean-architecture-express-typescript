import type { Contact } from '@/entities/contact';
import { ContactRepository } from '@/repositoriesType/contact-repository';
import type { GetSingleContactUseCase } from '@/useCasesType/contact/get-single-contact';

export class GetSingleContact implements GetSingleContactUseCase {
	private readonly contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(id: Contact['_id']): Promise<Contact | null> {
		const result = await this.contactRepository.getContact(id);
		return result;
	}
}
