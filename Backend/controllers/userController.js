import { generateCustomError } from "../middleware/errorHandler.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";

export const signup = async(req, res , next)=>{
    const {name, email, password} = req.body; // TODO: senitation(סניטציה) to check it exists, with ZOD/vinejs library

    // const newUser = new User({
    //     name,
    //     email,
    //     password: password && bcrypt.hashSync(password, 10),
    // });

    // const user = await newUser.save();

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