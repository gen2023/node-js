const { Router } = require('express');
const {
  listUsersController,
  addUserController,
  updateUserController,
  deleteUserController,
  findByIdUserController,
} = require('./users.controller');

const {
  checkAuthTokenMiddelware,
} = require('../../middelwares/auth.middelware');

const usersRouter = Router();

usersRouter.get('/', checkAuthTokenMiddelware, listUsersController);
usersRouter.post('/', addUserController);
usersRouter.patch('/', updateUserController);
usersRouter.delete('/:userId', deleteUserController);
usersRouter.get('/:userId', findByIdUserController);

module.exports = usersRouter;
