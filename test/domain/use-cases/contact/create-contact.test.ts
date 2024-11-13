import type { ContactWithoutId } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';

import { CreateContact } from '@/useCases/contact/create-contact';

describe('Create Contact Use Case', () => {
	test('should return true', async () => {
		const dummyData: ContactWithoutId = {
			firstName: 'John',
			surname: 'Smith',
			email: 'john@gmail.com',
		};
		const mockContactRepository: ContactRepository = {
			createContact: jest.fn().mockResolvedValue(true),
			getContacts: jest.fn(),
			getContact: jest.fn(),
			updateContact: jest.fn(),
			deleteContact: jest.fn(),
		};
		const createContactUse = new CreateContact(mockContactRepository);

		const result = await createContactUse.execute(dummyData);

		expect(result).toBe(true);
	});
});
