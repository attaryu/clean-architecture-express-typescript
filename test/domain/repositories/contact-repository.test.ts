import type { ContactDataSource } from '@/dataSourcesType/contact-data-source';
import type { Contact, ContactWithoutId } from '@/entities/contact';

import { ContactRepositoryImpl } from '@/repositories/contact-repository';

describe('Contact Repository', () => {
	const dummyData: ContactWithoutId = {
		surname: 'Smith',
		firstName: 'John',
		email: 'john@gmail.com',
	};
	const dummyId: Contact['_id'] = '1';
	const dummyDataWithId: Contact = { ...dummyData, _id: dummyId };

	const fakeContactDataSource: ContactDataSource = {
		getAll: jest.fn().mockResolvedValue([{ dummyDataWithId }]),
		get: jest.fn().mockResolvedValue(dummyData),
		create: jest.fn().mockResolvedValue(true),
		update: jest.fn().mockResolvedValue(true),
		delete: jest.fn().mockResolvedValue(true),
	};

	const contactRepository = new ContactRepositoryImpl(fakeContactDataSource);

	describe('getAllContacts', () => {
		test('Should return data', async () => {
			const result = await contactRepository.getContacts();

			expect(result).toStrictEqual([{ dummyDataWithId }]);
			expect(fakeContactDataSource.getAll).toHaveBeenCalledTimes(1);
		});
	});

	describe('getSingleContact', () => {
		test('Should return data', async () => {
			const result = await contactRepository.getContact(dummyId);

			expect(result).toStrictEqual(dummyData);
			expect(fakeContactDataSource.get).toHaveBeenCalledTimes(1);
			expect(fakeContactDataSource.get).toHaveBeenCalledWith(dummyId);
		});
	});

	describe('createContact', () => {
		test('Should return true', async () => {
			const result = await contactRepository.createContact(dummyData);

			expect(result).toBe(true);
			expect(fakeContactDataSource.create).toHaveBeenCalledTimes(1);
			expect(fakeContactDataSource.create).toHaveBeenCalledWith(dummyData);
		});
	});

	describe('updateContact', () => {
		test('Should return true', async () => {
			const result = await contactRepository.updateContact(dummyId, dummyData);

			expect(result).toBe(true);
			expect(fakeContactDataSource.update).toHaveBeenCalledTimes(1);
			expect(fakeContactDataSource.update).toHaveBeenCalledWith(dummyId, dummyData);
		});
	});

	describe('deleteContact', () => {
		test('Should return true', async () => {
			const result = await contactRepository.deleteContact(dummyId);

			expect(result).toBe(true);
			expect(fakeContactDataSource.delete).toHaveBeenCalledTimes(1);
			expect(fakeContactDataSource.delete).toHaveBeenCalledWith(dummyId);
		});
	});
});
