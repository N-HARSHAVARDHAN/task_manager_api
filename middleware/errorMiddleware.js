export function errorHandler(error,req,res,next){
    console.error(error);
    if(error.name === 'SequelizeUniqueConstraintError'){
        return res.status(409).json({
            message:"username or email already exists"
        });
    }
    res.status(500).json({
        message:"something went wrong"
    });
}