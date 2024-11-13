import { ContactRepository } from '@/repositoriesType/contact-repository';
import { DeleteContact } from '@/useCases/contact/delete-contact';

describe('Delete Contact Use Case', () => {
  test('Should return true', async () => {
    const dummyId = '123';
    const fakeContactRepository: ContactRepository = {
      updateContact: jest.fn().mockResolvedValue(true),
      getContacts: jest.fn(),
      getContact: jest.fn(),
      createContact: jest.fn(),
      deleteContact: jest.fn(),
    }
    const deleteContact = new DeleteContact(fakeContactRepository);

    const result = await deleteContact.execute(dummyId);

    expect(result).toBe(true);
    expect(fakeContactRepository.deleteContact).toHaveBeenCalledTimes(1);
    expect(fakeContactRepository.deleteContact).toHaveBeenCalledWith(dummyId);
  });
});