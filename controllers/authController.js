import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import env from "../config/env.js";

export async function registerUser(req,res,next) {
    try{
        const {username,email} = req.body;
        const existingUser = await User.findOne({
            where:{
                [Op.or]:[
                    {username},
                    {email}
                ]
            }
        });
        if(existingUser){
            if(existingUser.username === username){
                return res.status(409).json({
                    message:"username already exists"
                });
            }
            if(existingUser.email === email){
                return res.status(409).json({
                    message:"email already exists"
                });
            }
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const user = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });
        res.status(201).json({
            message:"user registered sucessfully",
            user:{
                id:user.id,
                username:user.username,
                email:user.email
            }
        });
    }
    catch(error){
       next(error);
    }
}

export async function loginUser(req,res,next) {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({
            where:{
                email:email
            }
        });
        if(!user){
            return res.status(401).json({
                message:"invalid email"
            });
        }
        const passwordMatch = await bcrypt.compare(
            password, user.password
        );
        if(!passwordMatch){
            return res.status(401).json({
                message:'invalid password'
            });
        }
        const token = jwt.sign(
            {userId:user.id},
            env.jwt.secret,
            {expiresIn:"1h"}
        );
        res.status(200).json({
            message:"login succesfull",
            token:token,
            user:{
                id:user.id,
                username:user.username,
                email:user.email
            }
        });
    }
    catch(error){
       next(error);
    }
}