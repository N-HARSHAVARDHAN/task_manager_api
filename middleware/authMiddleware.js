import jwt from 'jsonwebtoken';
import env from '../config/envConfig.js';

export function authMiddleware(req,res,next){
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({
                message:"no token provided"
            });

        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,env.jwt.secret
        );
        
        req.user = decoded;
        next();
    }
    catch{
        return res.status(401).json({
            message:"invalid or expired token"
        });
    }
}