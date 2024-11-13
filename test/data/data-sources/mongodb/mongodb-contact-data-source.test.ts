import type { Contact } from '@/entities/contact';
import type { MongoDB } from 'src/data/interfaces/database-wrapper/mongodb';

import { MongoDBContactDataSource } from '@/dataSources/mongodb/mongodb-contact-data-source';

describe('MongoDB DataSource', () => {
	const dummyData: Contact = {
		_id: '123',
		surname: 'Smith',
		firstName: 'John',
		email: 'john@gmail.com',
	};

	const databaseMock: MongoDB<Contact> = {
		convertToObjectId: jest.fn().mockImplementation(() => dummyData._id),
		find: jest.fn().mockResolvedValue([dummyData]),
		findOne: jest.fn().mockResolvedValue(dummyData),
		insertOne: jest.fn().mockResolvedValue({ insertedId: dummyData._id }),
		updateOne: jest.fn().mockResolvedValue({ updatedId: dummyData._id }),
		deleteOne: jest.fn().mockResolvedValue({ deletedId: dummyData._id }),
	};

	const ds = new MongoDBContactDataSource(databaseMock);

	test('getAll', async () => {
		const result = await ds.getAll();

		expect(result).toStrictEqual([dummyData]);
		expect(databaseMock.find).toHaveBeenCalledTimes(1);
		expect(databaseMock.find).toHaveBeenCalledWith({});
	});

	test('get', async () => {
		const result = await ds.get(dummyData._id);

		expect(result).toStrictEqual(dummyData);
		expect(databaseMock.findOne).toHaveBeenCalledTimes(1);
		expect(databaseMock.findOne).toHaveBeenCalledWith({ _id: dummyData._id });
	});

	test('create', async () => {
		const result = await ds.create(dummyData);

		expect(result).toStrictEqual(true);
		expect(databaseMock.insertOne).toHaveBeenCalledTimes(1);
		expect(databaseMock.insertOne).toHaveBeenCalledWith(dummyData);
	});

	test('update', async () => {
		const result = await ds.update(dummyData._id, dummyData);

		expect(result).toStrictEqual(true);
		expect(databaseMock.updateOne).toHaveBeenCalledTimes(1);
		expect(databaseMock.updateOne).toHaveBeenCalledWith(
			{ _id: dummyData._id },
			{
				$set: {
					surname: dummyData.surname,
					firstName: dummyData.firstName,
					email: dummyData.email,
				},
			}
		);
	});

	test('delete', async () => {
		const result = await ds.delete(dummyData._id);

		expect(result).toStrictEqual(true);
		expect(databaseMock.deleteOne).toHaveBeenCalledTimes(1);
		expect(databaseMock.deleteOne).toHaveBeenCalledWith({ _id: dummyData._id });
	});
});
