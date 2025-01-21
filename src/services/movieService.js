import movies from "../movies.js";

export function findMovie(movieId){
    const result = movies.find(movie => movie.id === movieId);

    return result;
}
