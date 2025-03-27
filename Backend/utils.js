import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import {generateCustomError} from './middleware/errorHandler.js'
config();

export const generateToken = ({_id, name, email}) => {
    return jwt.sign({_id, name, email},process.env.JWT_PW, {
        expiresIn: process.env.JWT_EXPIRATION
    })
}

export const isAuth = (req,res,next) => {
    // "Bearer " => authorization
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return next(generateCustomError(401, "No Token Found!"));
        }

        //"BEARER KK".split(" ")[1] => KK
        const token = auth.split(" ")[1];
        jwt.verify(token,process.env.JWT_PW, (err, decodedToken) => {
            if (err) {
                return next(generateCustomError(401, err.message || "Invalid Token"));
            }

            req.user = decodedToken;
            next();
        })
    } catch (error) {
        next(generateCustomError(500, `Server error: ${error.message}`));
    }
}