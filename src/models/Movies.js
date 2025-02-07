import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [5, 'Title should be at least 5 characters long!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Title should include only English letters, digits, and whitespaces!']        
    },
    category: String,
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [5, 'Genre should be at least 5 characters long!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Genre should include only English letters, digits, and whitespaces!'] 
    },
    director: {
        type: String,
        required: [true, 'Director is required!'],
        minLength: [5, 'Director should be at least 5 characters long!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Director should include only English letters, digits, and whitespaces!'] 
    },
    year: {
        type: Number,
        min: 1900,
        max: 2025
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'ImageUrl should start with http://... or https://...!'] 
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [20, 'Description should be at least 20 characters long!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Description should include only English letters, digits, and whitespaces!'] 
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

const Movie = model('Movie', movieSchema);

export default Movie;