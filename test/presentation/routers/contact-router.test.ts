import type { Contact } from '@/entities/contact';
import type { CreateContactUseCase } from '@/useCasesType/contact/create-contact';
import type { GetAllContactsUseCase } from '@/useCasesType/contact/get-all-contacts';

import request from 'supertest';

import ContactsRouter from '@/routes/contacts-router';
import server from '@/server';

describe('Contact router', () => {
	class MockGetAllContactsUseCase implements GetAllContactsUseCase {
		execute(): Promise<Contact[]> {
			throw new Error('Method not implemented.');
		}
	}

	class MockCreateContactUseCase implements CreateContactUseCase {
		execute(contact: Contact): Promise<boolean> {
			throw new Error('Method not implemented.');
		}
	}

	let mockGetAllContactsUseCase: MockGetAllContactsUseCase;
	let mockCreateContactUseCase: MockCreateContactUseCase;

	beforeAll(() => {
		mockGetAllContactsUseCase = new MockGetAllContactsUseCase();
		mockCreateContactUseCase = new MockCreateContactUseCase();

		server.use(
			'/contact',
			ContactsRouter(mockGetAllContactsUseCase, mockCreateContactUseCase)
		);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('GET /contact', () => {
		test('should return 200 with data', async () => {
			const ExpectData = [
				{
					id: '1',
					surname: 'Smith',
					firstName: 'John',
					email: 'john@gmail.com',
				},
			];

			jest
				.spyOn(mockGetAllContactsUseCase, 'execute')
				.mockImplementation(() => Promise.resolve(ExpectData));

			const response = await request(server).get('/contact');

			expect(response.status).toBe(200);
			expect(mockGetAllContactsUseCase.execute).toHaveBeenCalledTimes(1);
			expect(response.body).toStrictEqual(ExpectData);
		});

		test('GET /contact returns 500 on use case error', async () => {
			jest
				.spyOn(mockGetAllContactsUseCase, 'execute')
				.mockImplementation(() => Promise.reject(Error()));

			const response = await request(server).get('/contact');

			expect(response.status).toBe(500);
			expect(response.body).toStrictEqual({ message: 'Error fetching data' });
		});
	});

	describe('POST /contact', () => {
		test('POST /contact', async () => {
			const InputData = {
				id: '1',
				surname: 'Smith',
				firstname: 'John',
				email: 'john@gmail.com',
			};

			jest
				.spyOn(mockCreateContactUseCase, 'execute')
				.mockImplementation(() => Promise.resolve(true));

			const response = await request(server).post('/contact').send(InputData);

			expect(response.status).toBe(201);
		});

		test('POST /contact returns 500 on use case error', async () => {
			const InputData = {
				id: '1',
				surname: 'Smith',
				firstname: 'John',
				email: 'john@gmail.com',
			};

			jest
				.spyOn(mockCreateContactUseCase, 'execute')
				.mockImplementation(() => Promise.reject(Error()));

			const response = await request(server).post('/contact').send(InputData);

			expect(response.status).toBe(500);
		});
	});
});
