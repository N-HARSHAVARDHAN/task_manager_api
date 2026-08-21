import logger from "../utils/logger.js";

export function errorHandler(error,req,res,next){

    logger.error("request error",{
        error:error.message,
        stack:error.stack
    })
    if(error.name === 'SequelizeUniqueConstraintError'){
        return res.status(409).json({
            message:"username or email already exists"
        });
    }
    res.status(500).json({
        message:"something went wrong"
    });
}