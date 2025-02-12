import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: /\@[a-zA-Z]+.[a-zA-Z]+/,
        minLength: [10, 'Email should be at least 10 characters long!'],
    },
    password: {
        type: String,
        required: true,
        match: /^\w+$/,
        minLength: [6, 'Password should be at least 6 characters long!'],
    }
});

userSchema.pre('save', async function (){
    this.password = await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);

export default User;
