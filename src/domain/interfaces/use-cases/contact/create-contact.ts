import type { ContactWithoutId } from '@/entities/contact';

export interface CreateContactUseCase {
	execute(contact: ContactWithoutId): Promise<boolean>;
}
