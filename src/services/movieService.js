import Movie from "../models/Movies.js";


export default {
    findMovie(movieId){
        const query = Movie.findById(movieId);
    
        return query;
    },
    getOneWithCast (movieId){
        return this.findMovie(movieId).populate('casts')
    },
    createMovie(movieData, creatorId){
        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId
        });
        
        return result;
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
    },
    attachCast (movieId, castId) {
        return Movie.findByIdAndUpdate(movieId, {$push: {casts: castId}});
    }
} 
