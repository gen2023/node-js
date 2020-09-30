const { Router } = require('express');
const {
  registrationController,
  loginController,
  logoutController,
} = require('./auth.controller');
const { validationMiddleware } = require('./auth.validator');

const authRouter = Router();

authRouter.post('/registration', validationMiddleware, registrationController);
authRouter.post('/login', validationMiddleware, loginController);
authRouter.post('/logout', logoutController);

module.exports = authRouter;
