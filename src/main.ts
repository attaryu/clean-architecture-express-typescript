import type { OptionalId } from 'mongodb';

import type { MongoDB } from '@/databaseWrapperType/mongodb';
import type { Contact } from '@/entities/contact';

import { MongoClient, ObjectId } from 'mongodb';

import { MongoDBContactDataSource } from '@/dataSources/mongodb/mongodb-contact-data-source';
import { ContactRepositoryImpl } from '@/repositories/contact-repository';
import ContactsRouter from '@/routes/contacts-router';
import { CreateContact } from '@/useCases/contact/create-contact';
import { DeleteContact } from '@/useCases/contact/delete-contact';
import { GetAllContacts } from '@/useCases/contact/get-all-contacts';
import { GetSingleContact } from '@/useCases/contact/get-single-contact';
import { UpdateContact } from '@/useCases/contact/update-contact';
import server from './server';

(async () => {
	const client = new MongoClient('mongodb://localhost:27017/contact');
	await client.connect();

	const db = client.db('contact');

	const collections = {
		contact: db.collection<OptionalId<Contact>>('contact'),
	};

	const contactDatabase: MongoDB<Contact> = {
		convertToObjectId: (id) => new ObjectId(id) as unknown as string,

		find: (query) => collections.contact.find(query).toArray(),
		findOne: (query) => collections.contact.findOne(query),
		insertOne: (doc) => collections.contact.insertOne(doc),
		updateOne: (query, doc) => collections.contact.updateOne(query, doc),
		deleteOne: (query) => collections.contact.deleteOne(query),
	};

	const contactRepository = new ContactRepositoryImpl(
		new MongoDBContactDataSource(contactDatabase)
	);

	const contactRouter = ContactsRouter({
		getAllContacts: new GetAllContacts(contactRepository),
		getSingleContact: new GetSingleContact(contactRepository),
		createContact: new CreateContact(contactRepository),
		updateContact: new UpdateContact(contactRepository),
		deleteContact: new DeleteContact(contactRepository),
	});

	server.use('/contact', contactRouter);

	server.listen(4000, () => console.log('Running on server'));
})();
