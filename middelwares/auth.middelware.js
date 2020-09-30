const { verifyToken } = require('../services/token.services');
const User = require('../api/users/users.models');

const checkAuthTokenMiddelware = async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    if (!token) {
      return res.status(401).send('Not authorized');
    }

    const data = await verifyToken(token);
    req.userId = data.userId;

    next();
  } catch (e) {
    res.status(401).send('Not authorized');
  }
};

module.exports = { checkAuthTokenMiddelware };
