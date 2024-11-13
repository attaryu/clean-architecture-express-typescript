import type { Contact } from '@/entities/contact';

export interface DeleteContactUseCase {
	execute(id: Contact['_id']): Promise<boolean>;
}
