import movies from "../movies.js";
import { v4 as uuid } from "uuid";

export default {
    findMovie(movieId){
        const result = movies.find(movie => movie.id === movieId);
    
        return result;
    },
    createMovie(movieData){
        const newId = uuid();

        movies.push({
            id: newId,
            ...movieData,
        });
        return newId;
    }, 
    getAll (){
        return movies;
    }
} 
