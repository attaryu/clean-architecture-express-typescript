import type { Contact } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';

import { CreateContact } from '@/useCases/contact/create-contact';

describe('Create Contact Use Case', () => {
	class MockContactRepository implements ContactRepository {
		createContact(contact: Contact): Promise<boolean> {
			throw new Error('Method not implemented.');
		}

		getContacts(): Promise<Contact[]> {
			throw new Error('Method not implemented.');
		}
	}

	let mockContactRepository: ContactRepository;

	beforeEach(() => {
		jest.clearAllMocks();
		mockContactRepository = new MockContactRepository();
	});

	test('should return true', async () => {
		const InputData: Contact = {
			id: '1',
			firstName: 'John',
			surname: 'Smith',
			email: 'john@gmail.com',
		};

		jest
			.spyOn(mockContactRepository, 'createContact')
			.mockImplementation(() => Promise.resolve(true));

		const createContactUse = new CreateContact(mockContactRepository);
		const result = await createContactUse.execute(InputData);

		expect(result).toBe(true);
	});
});
