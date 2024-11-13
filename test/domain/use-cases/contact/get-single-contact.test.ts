import type { Contact } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';

import { GetSingleContact } from '@/useCases/contact/get-single-contact';

describe('Get Single Contact Use Case', () => {
	test('Should return a single contact', async () => {
		const dummyData: Contact = {
			_id: '123',
			firstName: 'John',
			surname: 'Smith',
			email: 'john@gmail.com',
		};
		const fakeContactRepository: ContactRepository = {
			getContact: jest.fn().mockResolvedValue(dummyData),
			getContacts: jest.fn(),
			createContact: jest.fn(),
			updateContact: jest.fn(),
			deleteContact: jest.fn(),
		};
		const getSingleContact = new GetSingleContact(fakeContactRepository);

		const result = await getSingleContact.execute(dummyData._id);

		expect(result).toStrictEqual(dummyData);
		expect(fakeContactRepository.getContact).toHaveBeenCalledTimes(1);
		expect(fakeContactRepository.getContact).toHaveBeenCalledWith(
			dummyData._id
		);
	});
});
