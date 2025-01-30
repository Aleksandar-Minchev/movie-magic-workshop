import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";


const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create')
});
movieController.get('/search', async (req, res) => {

    const filter = req.query;    
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter })
});
movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieService.createMovie(newMovie);

    res.redirect('/');
});
movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.findMovie(movieId);

    res.render('details', { movie });
});
movieController.get('/:movieId/cast-attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.findMovie(movieId);
    const casts = await castService.getAll();

    res.render('cast-attach', { movie, casts });
});
movieController.post('/:movieId/cast-attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    await movieService.attachCast(movieId, castId);
    
    res.redirect(`/movies/${movieId}/details`);
});

export default movieController;