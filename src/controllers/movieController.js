import { Router } from "express";
import movieService from "../services/movieService.js";


const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create')
});
movieController.get('/movies/search', (req, res) => {

    const filter = req.query;    
    const movies = movieService.getAll(filter);

    res.render('search', { movies, filter })
});
movieController.post('/movies/create', (req, res) => {
    const newMovie = req.body;
    movieService.createMovie(newMovie);

    res.redirect('/');
});
movieController.get('/movies/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.findMovie(movieId);

    res.render('details', { movie });
});

export default movieController;