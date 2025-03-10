import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const generateToken = (_id,name,email)=>{
    return jwt.sign({_id, name, email}, process.env.JWT_PW, {
        expiresIn: process.env.JWT_EXPIRATION
    });
}