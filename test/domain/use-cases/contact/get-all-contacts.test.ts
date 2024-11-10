import type { Contact } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';

import { GetAllContacts } from '@/useCases/contact/get-all-contacts';

describe('Get All Contacts Use Case', () => {
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

	test('should return data', async () => {
		const ExpectedResult = [
			{ id: '1', surname: 'Smith', firstName: 'John', email: 'john@gmail.com' },
		];

		jest
			.spyOn(mockContactRepository, 'getContacts')
			.mockImplementation(() => Promise.resolve(ExpectedResult));

		const getAllContactsUse = new GetAllContacts(mockContactRepository);
		const result = await getAllContactsUse.execute();

		expect(result).toStrictEqual(ExpectedResult);
	});
});
