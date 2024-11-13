import type { ContactDataSource } from '@/dataSourcesType/contact-data-source';
import type { MongoDB } from '@/databaseWrapperType/mongodb';
import type { Contact, ContactWithoutId } from '@/entities/contact';

export class MongoDBContactDataSource implements ContactDataSource {
	private readonly database: MongoDB<Contact>;

	constructor(database: MongoDB<Contact>) {
		this.database = database;
	}

	async getAll(): Promise<Contact[]> {
		const result = await this.database.find({});
		return result;
	}

	async get(id: Contact['_id']): Promise<Contact | null> {
		const result = await this.database.findOne({
			_id: this.database.convertToObjectId(id),
		});

		return result;
	}

	async create(contact: ContactWithoutId): Promise<boolean> {
		const result = await this.database.insertOne(contact);
		return result !== null;
	}

	async update(
		id: Contact['_id'],
		contact: Partial<ContactWithoutId>
	): Promise<boolean> {
		const result = await this.database.updateOne(
			{ _id: this.database.convertToObjectId(id) },
			{
				$set: {
					email: contact.email,
					firstName: contact.firstName,
					surname: contact.surname,
				},
			}
		);

		return result !== null;
	}

	async delete(id: Contact['_id']): Promise<boolean> {
		const result = await this.database.deleteOne({
			_id: this.database.convertToObjectId(id),
		});

		return result !== null;
	}
}
