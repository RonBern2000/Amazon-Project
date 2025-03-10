import {generateCustomError} from './errorHandler';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const isAuth = (req, res, next) => {
    try {
        const auth = req.headers.authorization;
        if(!auth){
            return next(generateCustomError(401, "No Token Found!"));
        }
        const token = auth.split(" ")[1];
        jwt.verify(token, process.env.JWT_PW, (error, decodedToken)=> {
            if(error){
                return next(generateCustomError(401, error.message || "Invalid Token"));
            }

            req.user = decodedToken;
            next();
        });
    } catch (error) {
        next(generateCustomError(500, `Server error: ${error.message}`));
    }
}