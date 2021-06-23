const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string().alphanum().max(100).required(),
    lastName: Joi.string().alphanum().max(100).required(),
    bio: Joi.string().max(300).required(),
    username: Joi.string().alphanum().max(30).required(),
    socials: [Joi.object({ platform: Joi.string().required(), url: Joi.string().required() })],
    email:  Joi.string().max(30).required(),
    phoneNumber:  Joi.string().max(30),
    profileImage: Joi.string(),
    gender: Joi.string(),
    address: Joi.object({
      building: Joi.string(),
      street: Joi.string().required(),
      postalCode: Joi.string(),
      district: Joi.string(),
      region: Joi.string(),
      country: Joi.object({ name: Joi.string().required(), code: Joi.string()})
    })
})
module.exports.register = function (input) {

}