import type { ContactDataSource } from '@/dataSourcesType/contact-data-source';

import { ContactRepositoryImpl } from '@/repositories/contact-repository';

describe('Contact Repository', () => {
	const dummyData = {
		id: '1',
		surname: 'Smith',
		firstName: 'John',
		email: 'john@gmail.com',
	};

	const fakeContactDataSource: ContactDataSource = {
		getAll: jest.fn().mockResolvedValue([dummyData]),
		create: jest.fn().mockResolvedValue(true),
	};

	const contactRepository = new ContactRepositoryImpl(fakeContactDataSource);

	describe('getAllContacts', () => {
		test('Should return data', async () => {
			const result = await contactRepository.getContacts();

			expect(result).toStrictEqual([dummyData]);
			expect(fakeContactDataSource.getAll).toHaveBeenCalledTimes(1);
		});
	});

	describe('createContact', () => {
		test('Should return true', async () => {
			const result = await contactRepository.createContact(dummyData);

			expect(result).toBe(true);
			expect(fakeContactDataSource.create).toHaveBeenCalledTimes(1);
		});
	});
});
