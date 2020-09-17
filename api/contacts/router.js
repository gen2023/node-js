const { Router } = require('express');

const Contacts = require('../../contacts');

const contactsRouter = Router();

contactsRouter.get('/', async (req, res) => {
  const contacts = await Contacts.listContacts();
  res.status(200).json(contacts);
});

contactsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const contacts = await Contacts.getContactById(+id);
  if (contacts) {
    res.status(200).json(contacts);
  } else res.status(404).send('not found');
});

contactsRouter.post('/', async (req, res) => {
  const { name, email, phone } = req.body;

  if (
    typeof name === 'string' &&
    typeof email === 'string' &&
    typeof phone === 'string' &&
    name.length &&
    email.length &&
    phone.length
  ) {
    const contacts = await Contacts.addContact(name, email, phone);

    res.status(200).json(contacts);
    return;
  }
  res.status(404).send({ message: 'missing required name field' });
});

contactsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const findContacts = await Contacts.getContactById(+id);

  if (findContacts) {
    await Contacts.removeContact(+id);
    res.status(200).send({ message: 'contact deleted' });
  }
  res.status(404).send({ message: 'not found' });
});

contactsRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const findContacts = await Contacts.getContactById(+id);
  const { name, email, phone } = req.body;
  if (findContacts) {
    if (req.body) {
      const contacts = await Contacts.getUpdateContact(id, name, email, phone);
      res.status(200).json(contacts);
    } else {
      res.status(404).send({ message: 'missing fields' });
    }
  } else {
    res.status(404).send({ message: 'not found' });
  }
});

module.exports = contactsRouter;
