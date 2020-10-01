const mongoose = require('mongoose');

const userShema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },

    subscription: {
      type: String,
      enum: ['free', 'pro', 'premium'],
      default: 'free',
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

class User {
  constructor() {
    this.db = mongoose.model('Users', userShema);
  }
  listUsers = async () => {
    return await this.db.find();
  };
  addUser = async userData => {
    return await this.db.create(userData);
  };
  updateUser = async (userId, userData) => {
    return await this.db.findByIdAndUpdate(userId, userData);
  };
  deleteUser = async userId => {
    return await this.db.findByIdAndDelete(userId);
  };
  findUser = async userId => {
    return await this.db.findById(userId);
  };

  findOneUser = async query => {
    return await this.db.findOne(query);
  };
}

module.exports = new User();
