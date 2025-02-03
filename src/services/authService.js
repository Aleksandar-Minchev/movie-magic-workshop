import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = '$2b$10$RzfxbyasdfasfqLFEPgPbqvJuVMZIx1iPlkwPIG72NfLlkuREs6'

export default {
    register(userData){
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