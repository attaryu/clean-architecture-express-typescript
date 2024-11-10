import type { DatabaseWrapper } from '@/dataSourcesType/database-wrapper';
import { MongoDBContactDataSource } from '@/dataSources/mongodb/mongodb-contact-data-source';

describe('MongoDB DataSource', () => {
	let mockDatabase: DatabaseWrapper;

	const data = {
		surname: 'Smith',
		firstName: 'John',
		email: 'john@gmail.com',
	};

	beforeAll(async () => {
		mockDatabase = {
			find: jest.fn(),
			insertOne: jest.fn(),
		};
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('getAll', async () => {
		const ds = new MongoDBContactDataSource(mockDatabase);

		jest
			.spyOn(mockDatabase, 'find')
			.mockImplementation(() => Promise.resolve([{ ...data, _id: '123' }]));

		const result = await ds.getAll();

		expect(mockDatabase.find).toHaveBeenCalledWith({});
		expect(result).toStrictEqual([{ ...data, id: '123' }]);
	});

	test('create', async () => {
		const ds = new MongoDBContactDataSource(mockDatabase);

		jest
			.spyOn(mockDatabase, 'insertOne')
			.mockImplementation(() => Promise.resolve({ insertedId: '123' }));

		const result = await ds.create(data);

		expect(mockDatabase.insertOne).toHaveBeenCalledWith(data);
		expect(result).toStrictEqual(true);
	});
});
