import type { DatabaseWrapper } from '@/dataSourcesType/database-wrapper';

import { MongoDBContactDataSource } from '@/dataSources/mongodb/mongodb-contact-data-source';
import { ContactRepositoryImpl } from '@/repositories/contact-repository';
import ContactsRouter from '@/routes/contacts-router';
import { CreateContact } from '@/useCases/contact/create-contact';
import { GetAllContacts } from '@/useCases/contact/get-all-contacts';

import { MongoClient } from 'mongodb';
import server from './server';

(async () => {
	const client = new MongoClient('mongodb://localhost:27017/contact');
	await client.connect();

	const db = client.db('contact');

	const contactDatabase: DatabaseWrapper = {
		find: (query) => db.collection('contact').find(query).toArray(),
		insertOne: (doc) => db.collection('contact').insertOne(doc),
	};

	const contactRepository = new ContactRepositoryImpl(
		new MongoDBContactDataSource(contactDatabase)
	);

	const contactMiddleware = ContactsRouter(
		new GetAllContacts(contactRepository),
		new CreateContact(contactRepository)
	);

	server.use('/contact', contactMiddleware);

	server.listen(4000, () => console.log('Running on server'));
})();
