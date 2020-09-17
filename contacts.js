const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve(__dirname, 'bd', 'contacts.json');

async function listContacts() {
  const contactsData = await fs.readFile(contactsPath, {
    encoding: 'utf-8',
  });
  return JSON.parse(contactsData);
}

async function addContact(name, email, phone) {
  let contactsData = await listContacts();
  const id = contactsData.length ? [...contactsData].pop().id + 1 : 1;
  // console.log(id);
  const newContacts = { id, name, email, phone };

  contactsData.push(newContacts);
  const contactsDataJson = JSON.stringify(contactsData);
  await fs.writeFile(contactsPath, contactsDataJson);
  contactsData = await listContacts();
  return contactsData;
}

async function getContactById(id) {
  const contactsData = await listContacts();
  const findContact = contactsData.find(contact => contact.id === id);
  // console.log(findContact);
  return findContact;
}

async function removeContact(id) {
  let contactsData = await listContacts();
  console.log(contactsData);
  const result = contactsData.filter(contact => contact.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(result));
  contactsData = await listContacts();
  return contactsData;
}

async function getUpdateContact(id, name, email, phone) {
  let contactsData = await listContacts();
  const findContact = await getContactById(+id);
  if (name) {
    findContact.name = name;
  }
  if (email) {
    findContact.email = email;
  }
  if (phone) {
    findContact.phone = phone;
  }
  console.log(findContact);
  contactsData.splice(id - 1, 1, findContact);
  const contactsDataJson = JSON.stringify(contactsData);
  await fs.writeFile(contactsPath, contactsDataJson);

  return findContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  getUpdateContact,
};
