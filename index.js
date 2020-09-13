const contacts = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then(console.table);
      //console.table(list);
      break;

    case "get":
      contacts.getContactById(id).then(console.table);
      break;

    case "add":
      contacts.addContact(name, email, phone).then(console.table);
      break;

    case "remove":
      contacts.removeContact(id).then(console.table);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
