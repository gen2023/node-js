const UserDB = require('./users.models');

async function listUsersController(req, res, next) {
  try {
    const users = await UserDB.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

async function addUserController(req, res, next) {
  try {
    const { body } = req;
    const newUser = await UserDB.addUser(body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
}

async function updateUserController(req, res, next) {
  try {
    const { _id, ...data } = req.body;
    const updateUser = await UserDB.updateUser(_id, data);

    res.status(200).json(updateUser);
  } catch (err) {
    next(err);
  }
}

async function deleteUserController(req, res, next) {
  try {
    const { userId } = req.params;

    await UserDB.deleteUser(userId);
    res.status(200).send({ message: 'User deleted' });

    res.status(404).send({ message: 'not found' });
  } catch (err) {
    next(err);
  }
}

async function findByIdUserController(req, res, next) {
  try {
    const { userId } = req.params;
    const users = await UserDB.findUsers(userId);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listUsersController,
  addUserController,
  updateUserController,
  deleteUserController,
  findByIdUserController,
};
