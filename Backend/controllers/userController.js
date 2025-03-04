import { generateCustomError } from "../middleware/errorHandler.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";
import { userSchema } from "../DTO/userSchema.js";

export const signup = async(req, res , next)=>{
    // const newUser = new User({
    //     name,
    //     email,
    //     password: password && bcrypt.hashSync(password, 10),
    // });

    // const user = await newUser.save();
    
    const result =await userSchema.safeParseAsync(req.body);
    if(!result.success){
        throw new Error("Invalid credentials");
    }
    const {name, email, password} = result.data;

    try{
        const user = await User.create({
            name,
            email,
            password: password && bcrypt.hashSync(password, 10),
        });

        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user)
        });
    } catch(error){ //TODO: check where is the error
        next(generateCustomError(400, error.message || "Ivalid Credentials. Please try again!"));
    }
}