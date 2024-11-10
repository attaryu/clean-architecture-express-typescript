import { ContactDataSource } from '@/dataSourcesType/contact-data-source';
import { DatabaseWrapper } from '@/dataSourcesType/database-wrapper';
import { Contact } from '@/entities/contact';

export class MongoDBContactDataSource implements ContactDataSource {
	private readonly database: DatabaseWrapper;

	constructor(database: DatabaseWrapper) {
		this.database = database;
	}

	async create(contact: Contact): Promise<boolean> {
		const result = await this.database.insertOne(contact);
		return result !== null;
	}

	async getAll(): Promise<Contact[]> {
		const result = await this.database.find({});

		return result.map((item) => ({
			id: item._id.toString(),
			surname: item.surname,
			email: item.email,
			firstName: item.firstName,
		}));
	}
}
