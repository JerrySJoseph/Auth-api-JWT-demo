const JoiValidator= require('joi');

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
const loginValidator= (data)=>{
    const validatorSchema=JoiValidator.object(
        {
            password:JoiValidator.string().min(6).max(1024).required(),
            email:JoiValidator.string().email()
        }
    )
    return validatorSchema.validate(data)
}

module.exports.registerValidator=registerValidator;
module.exports.loginValidator=loginValidator;