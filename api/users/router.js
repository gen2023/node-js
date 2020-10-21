const { Router } = require('express');
const {
  listUsersController,
  addUserController,
  updateUserController,
  deleteUserController,
  findByIdUserController,
  uploadAvatarController,
} = require('./users.controller');

const {
  checkAuthTokenMiddelware,
} = require('../../middelwares/auth.middelware');

const {
  avatarUploaderMiddleware,
} = require('../../middelwares/imgUploader.middlewar');

const usersRouter = Router();

usersRouter.get('/', checkAuthTokenMiddelware, listUsersController);
usersRouter.post('/', addUserController);
usersRouter.patch('/', updateUserController);
usersRouter.delete('/:userId', deleteUserController);
usersRouter.get('/:userId', findByIdUserController);
usersRouter.post(
  'uploadAvatar',
  avatarUploaderMiddleware,
  uploadAvatarController,
);
module.exports = usersRouter;
