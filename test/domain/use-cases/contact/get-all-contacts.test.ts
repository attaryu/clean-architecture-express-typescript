import type { Contact } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';

import { GetAllContacts } from '@/useCases/contact/get-all-contacts';

describe('Get All Contacts Use Case', () => {
	test('should return data', async () => {
		const dummyData = [
			{ id: '1', surname: 'Smith', firstName: 'John', email: 'john@gmail.com' },
		];

		const mockContactRepository: ContactRepository = {
			createContact: jest.fn(),
			getContacts: jest.fn().mockResolvedValue(dummyData),
		};

		const getAllContactsUse = new GetAllContacts(mockContactRepository);
		const result = await getAllContactsUse.execute();

		expect(result).toStrictEqual(dummyData);
	});
});
