//Importing Joi Validator Package
const JoiValidator= require('joi');

//Custom Validator function for Register Route
const registerValidator= (data)=>{
    const validatorSchema=JoiValidator.object(
        {
            name:JoiValidator.string().min(6).max(255).required(),
            password:JoiValidator.string().min(6).max(1024).required(),
            email:JoiValidator.string().email()
        }
    )
    return validatorSchema.validate(data)
}
//Custom Validator function for Login Route
const loginValidator= (data)=>{
    const validatorSchema=JoiValidator.object(
        {
            password:JoiValidator.string().min(6).max(1024).required(),
            email:JoiValidator.string().email()
        }
    )
    return validatorSchema.validate(data)
}

//Exporting Validator Modules for access in other files
module.exports.registerValidator=registerValidator;
module.exports.loginValidator=loginValidator;