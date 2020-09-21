const mongoose = require('mongoose');

const contactShema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      default: 'NoName',
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    phone: {
      type: String,
      require: true,
      default: '(000) 000-0000',
    },
    subscription: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    token: { type: String },
  },
  {
    versionKey: false,
  },
);

class Contact {
  constructor() {
    this.db = mongoose.model('Contacts', contactShema);
  }
  listContacts = async () => {
    return await this.db.find();
  };
  addContact = async contactData => {
    return await this.db.create(contactData);
  };
  updateContact = async (contactId, contactData) => {
    return await this.db.findByIdAndUpdate(contactId, contactData);
  };
  deleteContact = async contactId => {
    return await this.db.findByIdAndDelete(contactId);
  };
  findContacts = async contactId => {
    return await this.db.findById(contactId);
  };
}

module.exports = new Contact();
