const Joi = require('joi');

const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{8,16}$/)
    .required()
    .error(errors => {
      errors.forEach(err => {
        if (err.code === 'string.pattern.base') {
          err.message = "'password' is not valid";
        }
      });
      return errors;
    }),
  subscription: Joi.string().allow('free', 'pro', 'premium'),
  token: Joi.string(),
});

const validationMiddleware = schema => async (req, res, next) => {
  const { error } = await schema.validate(req.body);
  if (error) {
    res.status(400).send('Error from validator libery');
    return;
  }
  next();
};

module.exports = {
  validationMiddleware: validationMiddleware(registrationSchema),
};
