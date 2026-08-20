import Joi from "joi";

const taskSchema = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().allow(""),
    priority:Joi.string()
    .valid("low","medium","high").required(),

    dueDate: Joi.date().required(),

    status: Joi.string()
    .valid("pending","completed")
    .required()
});

export function validateTask(req,res,next){
    const {error} = taskSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:error.details[0].message
        });
    }
    next();
}