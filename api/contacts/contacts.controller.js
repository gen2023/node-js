const ContactDB = require('./contacts.models');

async function listContactsController(req, res, next) {
  try {
    const contacts = await ContactDB.listContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
}

async function addContactController(req, res, next) {
  try {
    const { body } = req;
    const newContact = await ContactDB.addContact(body);
    res.status(201).json(newContact);
  } catch (err) {
    next(err);
  }
}

async function updateContactController(req, res, next) {
  try {
    const { _id, ...data } = req.body;
    const updateContact = await ContactDB.updateContact(_id, data);

    res.status(200).json(updateContact);
  } catch (err) {
    next(err);
  }
}

async function deleteContactController(req, res, next) {
  try {
    const { contactId } = req.params;

    await ContactDB.deleteContact(contactId);
    res.status(200).send({ message: 'contact deleted' });

    res.status(404).send({ message: 'not found' });
  } catch (err) {
    next(err);
  }
}

async function findByIdContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const contacts = await ContactDB.findContacts(contactId);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listContactsController,
  addContactController,
  updateContactController,
  deleteContactController,
  findByIdContactController,
};
