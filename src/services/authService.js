import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export default {
    async register(userData){
        // Is email unique
        const count = await User.countDocuments({email: userData.email});
        if (count > 0){
            throw new Error ('This email already exists');
        }

        //if passowrd and rePassword are same
        if (userData.password !== userData.repeat-password){
            throw new Error ('Passwords mismatch');
        }

        return User.create(userData)      
    },
    async login(email, password){
        //Check if user exists in DB
        const user = await User.findOne({email});
        if (!user){
            throw new Error('Invalid email or password!')
        }

        //Check if password is correct
        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass){
            throw new Error('Invalid email or password!');
        }
        //Generate token
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = jwt.sign(payload, SECRET, {expiresIn: '2h'})
                
        return token;
    }
}