import type { CreateContactUseCase } from '@/useCasesType/contact/create-contact';
import type { GetAllContactsUseCase } from '@/useCasesType/contact/get-all-contacts';

import express from 'express';

export default function ContactsRouter(
	getAllContactsUseCase: GetAllContactsUseCase,
	createContactUseCase: CreateContactUseCase
) {
	const router = express.Router();

	router.get('/', async (_req, res) => {
		try {
			const contacts = await getAllContactsUseCase.execute();
			console.log('contacts:', contacts);
			res.send(contacts);
		} catch (error) {
			res.status(500).send({ message: 'Error fetching data' });
		}
	});

	router.post('/', async (req, res) => {
		try {
			await createContactUseCase.execute(req.body);
			res.status(201).json({ message: 'Created' });
		} catch (error) {
			res.status(500).send({ message: 'Error saving data' });
		}
	});

	return router;
}
