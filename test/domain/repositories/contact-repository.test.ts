import type { ContactDataSource } from '@/dataSourcesType/contact-data-source';
import type { Contact } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';

import { ContactRepositoryImpl } from '@/repositories/contact-repository';

describe('Contact Repository', () => {
	class MockContactDataSource implements ContactDataSource {
		create(contact: Contact): Promise<boolean> {
			throw new Error('Method not implemented.');
		}

		getAll(): Promise<Contact[]> {
			throw new Error('Method not implemented.');
		}
	}

	let mockContactDataSource: MockContactDataSource;
	let contactRepository: ContactRepository;

	beforeEach(() => {
		jest.clearAllMocks();

		mockContactDataSource = new MockContactDataSource();
		contactRepository = new ContactRepositoryImpl(mockContactDataSource);
	});

	describe('getAllContacts', () => {
		test('Should return data', async () => {
			const expectedData = [
				{
					id: '1',
					surname: 'Smith',
					firstName: 'John',
					email: 'john@gmail.com',
				},
			];

			jest
				.spyOn(mockContactDataSource, 'getAll')
				.mockImplementation(() => Promise.resolve(expectedData));

			const result = await contactRepository.getContacts();

			expect(result).toBe(expectedData);
		});
	});

	describe('createContact', () => {
		test('Should return true', async () => {
			const inputData = {
				id: '1',
				surname: 'Smith',
				firstName: 'John',
				email: 'john@gmail.com',
			};

			jest
				.spyOn(mockContactDataSource, 'create')
				.mockImplementation(() => Promise.resolve(true));
      
      const result = await contactRepository.createContact(inputData);

      expect(result).toBe(true);
		});
	});
});
