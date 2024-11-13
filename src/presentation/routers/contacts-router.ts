import type { CreateContactUseCase } from '@/useCasesType/contact/create-contact';
import type { DeleteContactUseCase } from '@/useCasesType/contact/delete-contact';
import type { GetAllContactsUseCase } from '@/useCasesType/contact/get-all-contacts';
import type { GetSingleContactUseCase } from '@/useCasesType/contact/get-single-contact';
import type { UpdateContactUseCase } from '@/useCasesType/contact/update-contact';

import express from 'express';

export default function ContactsRouter(useCase: {
	getAllContacts: GetAllContactsUseCase;
	getSingleContact: GetSingleContactUseCase;
	createContact: CreateContactUseCase;
	updateContact: UpdateContactUseCase;
	deleteContact: DeleteContactUseCase;
}) {
	const router = express.Router();

	router
		.route('/')
		.get(async (_req, res) => {
			try {
				const contacts = await useCase.getAllContacts.execute();
				res.send(contacts);
			} catch (error) {
				res.status(500).send({ message: 'Error fetching data' });
			}
		})
		.post(async (req, res) => {
			try {
				await useCase.createContact.execute(req.body);
				res.status(201).json({ message: 'Created' });
			} catch (error) {
				res.status(500).send({ message: 'Error saving data' });
			}
		});

	router
		.route('/:contact_id')
		.get(async (req, res) => {
			try {
				const contact = await useCase.getSingleContact.execute(
					req.params.contact_id
				);
				res.send(contact);
			} catch (error) {
				res.status(500).send({ message: 'Error fetching data' });
			}
		})
		.patch(async (req, res) => {
			try {
				await useCase.updateContact.execute(req.params.contact_id, req.body);
				res.send({ message: 'Updated' });
			} catch (error) {
				res.status(500).send({ message: 'Error updating data' });
			}
		})
		.delete(async (req, res) => {
			try {
				await useCase.deleteContact.execute(req.params.contact_id);
				res.send({ message: 'Deleted' });
			} catch (error) {
				res.status(500).send({ message: 'Error deleting data' });
			}
		});

	return router;
}
