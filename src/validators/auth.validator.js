import joi from "joi";

// Account Creation validator
const AccountCreationValidator = joi.object({
  username: joi.string().required().max(25).min(3).regex(new RegExp("^[A-Za-z0-9]*$")),
  email: joi.string().required().email(),
  password: joi.string().required().min(7).max(250)
});

const AccountLoginValidator = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required().max(250)
});

const RefreshTokensValidator = joi.object({
  refresh_token: joi.string().required()
});

export {
  AccountCreationValidator,
  AccountLoginValidator,
  RefreshTokensValidator
}