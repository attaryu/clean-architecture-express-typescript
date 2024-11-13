import type { Contact } from '@/entities/contact';
import type { CreateContactUseCase } from '@/useCasesType/contact/create-contact';
import type { DeleteContactUseCase } from '@/useCasesType/contact/delete-contact';
import type { GetAllContactsUseCase } from '@/useCasesType/contact/get-all-contacts';
import type { GetSingleContactUseCase } from '@/useCasesType/contact/get-single-contact';
import type { UpdateContactUseCase } from '@/useCasesType/contact/update-contact';

import request from 'supertest';

import ContactsRouter from '@/routes/contacts-router';
import server from '@/server';

describe('Contact router', () => {
	const dummyData: Contact = {
		_id: '1',
		surname: 'Smith',
		firstName: 'John',
		email: 'john@gmail.com',
	};

	const fakeGetAllContacts: GetAllContactsUseCase = {
		execute: jest
			.fn()
			.mockResolvedValueOnce([dummyData])
			.mockRejectedValueOnce(Error()),
	};

	const fakeGetSingleContact: GetSingleContactUseCase = {
		execute: jest
			.fn()
			.mockResolvedValueOnce(dummyData)
			.mockRejectedValueOnce(Error()),
	};

	const fakeCreateContact: CreateContactUseCase = {
		execute: jest
			.fn()
			.mockResolvedValueOnce(true)
			.mockRejectedValueOnce(Error()),
	};

	const fakeUpdateContact: UpdateContactUseCase = {
		execute: jest
			.fn()
			.mockResolvedValueOnce(true)
			.mockRejectedValueOnce(Error()),
	};

	const fakeDeleteContact: DeleteContactUseCase = {
		execute: jest
			.fn()
			.mockResolvedValueOnce(true)
			.mockRejectedValueOnce(Error()),
	};

	server.use(
		'/contact',
		ContactsRouter({
			getAllContacts: fakeGetAllContacts,
			getSingleContact: fakeGetSingleContact,
			createContact: fakeCreateContact,
			updateContact: fakeUpdateContact,
			deleteContact: fakeDeleteContact,
		})
	);

	describe('GET /contact', () => {
		afterEach(() => jest.clearAllMocks());

		test('should return 200 with data', async () => {
			const response = await request(server).get('/contact');

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual([dummyData]);
			expect(fakeGetAllContacts.execute).toHaveBeenCalledTimes(1);
		});

		test('returns 500 on use case error', async () => {
			const response = await request(server).get('/contact');

			expect(response.status).toBe(500);
			expect(response.body).toStrictEqual({ message: 'Error fetching data' });
			expect(fakeGetAllContacts.execute).toHaveBeenCalledTimes(1);
		});
	});

	describe('POST /contact', () => {
		afterEach(() => jest.clearAllMocks());

		test('should return data', async () => {
			const response = await request(server).post('/contact').send(dummyData);

			expect(response.status).toBe(201);
			expect(response.body).toStrictEqual({ message: 'Created' });
			expect(fakeCreateContact.execute).toHaveBeenCalledTimes(1);
		});

		test('returns 500 on use case error', async () => {
			const response = await request(server).post('/contact').send(dummyData);

			expect(response.status).toBe(500);
			expect(response.body).toStrictEqual({ message: 'Error saving data' });
			expect(fakeCreateContact.execute).toHaveBeenCalledTimes(1);
		});
	});

	describe('GET /contact/:contact_id', () => {
		afterEach(() => jest.clearAllMocks());

		test('should return 200 with data', async () => {
			const response = await request(server).get(`/contact/${dummyData._id}`);

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual(dummyData);
			expect(fakeGetSingleContact.execute).toHaveBeenCalledTimes(1);
		});

		test('returns 500 on use case error', async () => {
			const response = await request(server).get(`/contact/${dummyData._id}`);

			expect(response.status).toBe(500);
			expect(response.body).toStrictEqual({ message: 'Error fetching data' });
			expect(fakeGetSingleContact.execute).toHaveBeenCalledTimes(1);
		});
	});

	describe('PATCH /contact/:contact_id', () => {
		afterEach(() => jest.clearAllMocks());

		test('should to be true', async () => {
			const response = await request(server)
				.patch(`/contact/${dummyData._id}`)
				.send(dummyData);

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual({ message: 'Updated' });
			expect(fakeUpdateContact.execute).toHaveBeenCalledTimes(1);
		});

		test('returns 500 on use case error', async () => {
			const response = await request(server)
				.patch(`/contact/${dummyData._id}`)
				.send(dummyData);

			expect(response.status).toBe(500);
			expect(response.body).toStrictEqual({ message: 'Error updating data' });
			expect(fakeUpdateContact.execute).toHaveBeenCalledTimes(1);
		});
	});

	describe('DELETE /contact/:contact_id', () => {
		afterEach(() => jest.clearAllMocks());

		test('should to be true', async () => {
			const response = await request(server).delete(
				`/contact/${dummyData._id}`
			);

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual({ message: 'Deleted' });
			expect(fakeDeleteContact.execute).toHaveBeenCalledTimes(1);
		});

		test('returns 500 on use case error', async () => {
			const response = await request(server).delete(
				`/contact/${dummyData._id}`
			);

			expect(response.status).toBe(500);
			expect(response.body).toStrictEqual({ message: 'Error deleting data' });
			expect(fakeDeleteContact.execute).toHaveBeenCalledTimes(1);
		});
	});
});
