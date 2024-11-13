import { Contact } from '@/entities/contact';

export interface GetSingleContactUseCase {
	execute(id: Contact['_id']): Promise<Contact | null>;
}
