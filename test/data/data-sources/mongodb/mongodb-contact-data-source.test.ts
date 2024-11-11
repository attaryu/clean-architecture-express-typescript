import type { DatabaseWrapper } from '@/dataSourcesType/database-wrapper';

import { MongoDBContactDataSource } from '@/dataSources/mongodb/mongodb-contact-data-source';

describe('MongoDB DataSource', () => {
	let ds: MongoDBContactDataSource;
	let databaseMock: DatabaseWrapper;

	const dataDummy = {
		surname: 'Smith',
		firstName: 'John',
		email: 'john@gmail.com',
	};

	beforeAll(() => {
		databaseMock = {
			find: jest.fn().mockResolvedValue([{ ...dataDummy, _id: '123' }]),
			insertOne: jest.fn().mockResolvedValue({ insertedId: '123' }),
		};

		ds = new MongoDBContactDataSource(databaseMock);
	});

	test('getAll', async () => {
		const result = await ds.getAll();

		expect(result).toStrictEqual([{ ...dataDummy, id: '123' }]);
		expect(databaseMock.find).toHaveBeenCalledWith({});
	});

	test('create', async () => {
		const result = await ds.create(dataDummy);

		expect(result).toStrictEqual(true);
		expect(databaseMock.insertOne).toHaveBeenCalledWith(dataDummy);
	});
});
