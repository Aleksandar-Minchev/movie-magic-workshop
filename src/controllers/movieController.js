import { Router } from "express";
import movieService from "../services/movieService.js";


const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create')
});
movieController.get('/search', (req, res) => {
    const movies = movieService.getAll();
    res.render('search', { movies })
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