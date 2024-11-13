import type { Contact, ContactWithoutId } from '@/entities/contact';
import type { ContactRepository } from '@/repositoriesType/contact-repository';

import { UpdateContact } from '@/useCases/contact/update-contact';

describe('Update Contact Use Case', () => {
	test('Should return true', async () => {
		const dummyId: Contact['_id'] = '123';
		const dummyData: ContactWithoutId = {
			firstName: 'John',
			surname: 'Smith',
			email: 'john@gmail.com',
		};
		const fakeContactRepository: ContactRepository = {
			updateContact: jest.fn().mockResolvedValue(true),
			getContacts: jest.fn(),
			getContact: jest.fn(),
			createContact: jest.fn(),
			deleteContact: jest.fn(),
		};
		const updateContact = new UpdateContact(fakeContactRepository);

		const result = await updateContact.execute(dummyId, dummyData);

		expect(result).toBe(true);
		expect(fakeContactRepository.updateContact).toHaveBeenCalledTimes(1);
		expect(fakeContactRepository.updateContact).toHaveBeenCalledWith(
			dummyId,
			dummyData
		);
	});
});
