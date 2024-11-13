import { Contact } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';
import type { DeleteContactUseCase } from '@/useCasesType/contact/delete-contact';

export class DeleteContact implements DeleteContactUseCase {
	private readonly contactRepository: ContactRepository;

	constructor(contactRepository: ContactRepository) {
		this.contactRepository = contactRepository;
	}

	async execute(id: Contact['_id']): Promise<boolean> {
		const result = await this.contactRepository.deleteContact(id);
		return result !== null;
	}
}
