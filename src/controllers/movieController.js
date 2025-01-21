import { Router } from "express";
import { findMovie } from "../services/movieService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create')
});
movieController.get('/movies/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = findMovie(movieId);    

    res.render('details', { movie });
});

export default movieController;