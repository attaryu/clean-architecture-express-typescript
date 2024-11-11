import type { Contact } from '@/entities/contact';
import type { CreateContactUseCase } from '@/useCasesType/contact/create-contact';
import type { GetAllContactsUseCase } from '@/useCasesType/contact/get-all-contacts';

import request from 'supertest';

import ContactsRouter from '@/routes/contacts-router';
import server from '@/server';

describe('Contact router', () => {
	const dummyData = {
		id: '1',
		surname: 'Smith',
		firstName: 'John',
		email: 'john@gmail.com',
	};

	const mockGetAllContactsUseCase: GetAllContactsUseCase = {
		execute: jest
			.fn()
			.mockResolvedValueOnce([dummyData])
			.mockRejectedValueOnce(Error()),
	};

	let mockCreateContactUseCase: CreateContactUseCase = {
		execute: jest
			.fn()
			.mockResolvedValueOnce(true)
			.mockRejectedValueOnce(Error()),
	};

	server.use(
		'/contact',
		ContactsRouter(mockGetAllContactsUseCase, mockCreateContactUseCase)
	);

	describe('GET /contact', () => {
		afterEach(() => jest.clearAllMocks())
		
		test('should return 200 with data', async () => {
			const response = await request(server).get('/contact');

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual([dummyData]);
			expect(mockGetAllContactsUseCase.execute).toHaveBeenCalledTimes(1);
		});

		test('GET /contact returns 500 on use case error', async () => {
			const response = await request(server).get('/contact');

			expect(response.status).toBe(500);
			expect(response.body).toStrictEqual({ message: 'Error fetching data' });
			expect(mockGetAllContactsUseCase.execute).toHaveBeenCalledTimes(1);
		});
	});

	describe('POST /contact', () => {
		afterEach(() => jest.clearAllMocks())
		
		test('POST /contact', async () => {
			const response = await request(server).post('/contact').send(dummyData);

			expect(response.status).toBe(201);
			expect(mockCreateContactUseCase.execute).toHaveBeenCalledTimes(1);
		});

		test('POST /contact returns 500 on use case error', async () => {
			const response = await request(server).post('/contact').send(dummyData);

			expect(response.status).toBe(500);
			expect(mockCreateContactUseCase.execute).toHaveBeenCalledTimes(1);
		});
	});
});
