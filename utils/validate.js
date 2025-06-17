// const jwt = require("jsonwebtoken");
// const generateToken = jwt.sign({ id: user.id, role: user.role }, "secretKey", {
//   expiresIn: "1h",
// });
// module.exports = generateToken;
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");
// Validate Register
function validateRegister(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(2).max(100).required(),
    lastName: Joi.string().trim().min(2).max(100).required(),
    userName: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: passwordComplexity().required(),
  });
  return schema.validate(obj);
}

// Validate Login
function validateLogin(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(8).required(),
  });
  return schema.validate(obj);
}
function validateCreateCategory(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(200).required(),
    description: Joi.string().trim().min(10).required(),
  });
  return schema.validate(obj);
}

// Validate Update Category
function validateUpdateCategory(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(200),
    description: Joi.string().trim().min(10),
  });
  return schema.validate(obj);
}
module.exports = {
  validateLogin,
  validateRegister,
  validateUpdateCategory,
  validateCreateCategory,
};
