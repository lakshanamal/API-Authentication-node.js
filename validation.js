const Joi = require("@hapi/joi");


// regiter feild validation
const authValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidate=(data)=>{
    const schema=Joi.object({
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required(),
    });
    return schema.validate(data);
}

module.exports.authValidation = authValidation;
module.exports.loginValidate=loginValidate;
