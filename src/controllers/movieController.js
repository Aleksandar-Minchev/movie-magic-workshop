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
    const userId = req.user?.id;

    await movieService.createMovie(newMovie, userId);

    res.redirect('/');
});
movieController.get('/:movieId/details', async (req, res) => {

    console.log(req.user);
    
    const movieId = req.params.movieId;
    const movie = await movieService.getOneWithCast(movieId);


    res.render('details', { movie });
});
movieController.get('/:movieId/cast-attach', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.findMovie(movieId);
    const casts = await castService.getAll({exclude: movie.casts});

    res.render('cast-attach', { movie, casts });
});
movieController.post('/:movieId/cast-attach', async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;
    await movieService.attachCast(movieId, castId);
    
    res.redirect(`/movies/${movieId}/details`);
});

export default movieController;