import { Router } from "express";
import movieService from "../services/movieService.js";


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

    res.render('cast-attach', { movie });
})

export default movieController;