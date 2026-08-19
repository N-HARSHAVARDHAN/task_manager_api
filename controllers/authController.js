import { User } from "../models/index.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerUser(req,res) {
    try{
        const hashedPassword = await bycrypt.hash(req.body.password,10);
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
        res.status(500).json({
            message:'failed to register',
            error:error.message
        });
    }
}

export async function loginUser(req,res) {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({
            where:{
                email:email
            }
        });
        if(!user){
            return res.status(401).json({
                message:"invalid email or password"
            });
        }
        const passwordMatch = await bycrypt.compare(
            password, user.password
        );
        if(!passwordMatch){
            return res.status(401).json({
                message:'invalid email or password'
            });
        }
        const token = jwt.sign(
            {userId:user.id},
            process.env.JWT_SECRET,
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
        res.status(500).json({
            message:'failed to login',
            error:error.message
        });
    }
}