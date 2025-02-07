import { Schema, model } from "mongoose";

const castSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [5, 'Name should be at least 20 characters long!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Name should include only English letters, digits, and whitespaces!'] 
    },
    age: {
        type: Number,
        min: 1,
        max: 120
    },
    born: {
        type: String,
        required: [true, 'Born field is required!'],
        minLength: [10, 'Born field should be at least 20 characters long!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Born field should include only English letters, digits, and whitespaces!'] 
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'ImageUrl should start with http://... or https://...!'] 
    },
});

const Cast = model('Cast', castSchema);

export default Cast;