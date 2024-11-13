import type { Contact, ContactWithoutId } from '@/entities/contact';

export interface UpdateContactUseCase {
	execute(
		id: Contact['_id'],
		contact: Partial<ContactWithoutId>
	): Promise<boolean>;
}
