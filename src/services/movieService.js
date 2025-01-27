import Movie from "../models/Movies.js";
import { v4 as uuid } from "uuid";

export default {
    findMovie(movieId){
        const query = Movie.findById(movieId);
    
        return query;
    },
    createMovie(movieData){
        const newId = uuid();

        movies.push({
            id: newId,
            ...movieData,
        });
        return newId;
    }, 
    getAll (filter = {}){
        let query = Movie.find({});

        if (filter.title){
            query = query.find({title: filter.title});
        }
        if (filter.genre){
            query = query.find({genre: filter.genre});
        }
        if (filter.year){
            query = query.find({year: Number(filter.year)});
        }

        return query;
    }
} 
