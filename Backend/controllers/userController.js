import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateCustomError } from '../middleware/errorHandler.js';
import { userSchema } from "../DTO/userSchema.js";
import { generateToken } from '../utils.js';
import {loginUserSchema} from '../DTO/loginUserSchema.js'

export const signup = async(req,res,next) => {

    const result =await userSchema.safeParseAsync(req.body);
    if(!result.success){
        return next(generateCustomError(404, "Invalid Credentials. Please try again!"))
    }
    const {name, email, password} = result.data;
    try {
        const user = await User.create({
            name,
            email,
            password: password && bcrypt.hashSync(password,10)
        });

        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user)
        })
    } catch (error) {
        next(generateCustomError(400, error.message || "Invalid Credentials. Please try again!"));
    }
}

export const signin = async(req,res,next) => {
    const result = await loginUserSchema.safeParseAsync(req.body);
     if(!result.success){
        return next(generateCustomError(404, "Invalid Credentials. Please try again!"))
    }
    const {email, password} = result.data;

    try {
        const user = await User.findOne({email});

        if(!user || !await bcrypt.compare(password, user.password)) {
            return next(generateCustomError(404, "Invalid Credentials. Please try again!"));
        }

        return res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user)
        })
    } catch (error) {
        return next(generateCustomError(400, error.message || "Invalid Credentials. Please try again!"));
    }
}