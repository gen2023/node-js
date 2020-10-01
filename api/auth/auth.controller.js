const User = require('../users/users.models');
const bcrypt = require('bcrypt'); //хеширование пароля

const { createVerificationToken } = require('../../services/token.services');

async function registrationController(req, res, next) {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    await User.addUser({ ...body, password: hashedPassword });
    res.status(200).send('Create user');
  } catch (e) {
    next(e);
  }
}

async function loginController(req, res, next) {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await User.findOneUser({ email });

    if (!user) {
      res.status(404).send(`User with email: ${email} not found`);
    }

    const isPasswordsEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordsEqual) {
      return res.status(404).send('Wrong password');
    }

    const token = await createVerificationToken({ userId: user._id });
    await User.updateUser(user._id, {
      token: token,
    });
    res.json({
      token,
    });
  } catch (e) {
    next(e);
  }
}

async function logoutController(req, res, next) {
  try {
    const {
      body: { id },
    } = req;

    const userLogout = await User.findUser({ _id: id });

    if (!userLogout.token) {
      res.status(401).json({ message: 'No autorization' });
      return;
    }
    await User.updateUser(userLogout._id, {
      token: '',
    });
    return res.status(204).send('No content');
  } catch (error) {
    next(error);
  }
}

module.exports = { registrationController, loginController, logoutController };
