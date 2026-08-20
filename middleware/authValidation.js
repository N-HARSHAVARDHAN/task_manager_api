import Joi from "joi";

const registerSchema = Joi.object({
    username: Joi.string()
    .trim().required(),

    email:Joi.string()
    .email().required(),

    password: Joi.string()
    .min(6).required()
});

const loginSchema = Joi.object({
    email:Joi.string()
    .trim().required(),

    password:Joi.string()
    .min(6).required()
});

export function validateRegister(req,res,next){
    const {error} = registerSchema.validate(req.body);

    if(error){
        return res.status(400).json({
            message:error.details[0].message
        });
    }
    next();
}

export function validateLogin(req,res,next){
    const {error} = loginSchema.validate(req.body);

    if(error){
        return res.status(400).json({
            message:error.details[0].message
        });
    }
    next();
}




