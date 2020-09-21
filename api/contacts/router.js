const { Router } = require('express');
const {
  listContactsController,
  addContactController,
  updateContactController,
  deleteContactController,
  findByIdContactController,
} = require('./contacts.controller');

const contactsRouter = Router();

contactsRouter.get('/', listContactsController);
contactsRouter.post('/', addContactController);
contactsRouter.patch('/', updateContactController);
contactsRouter.delete('/:contactId', deleteContactController);
contactsRouter.get('/:contactId', findByIdContactController);

module.exports = contactsRouter;
