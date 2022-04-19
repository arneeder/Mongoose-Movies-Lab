const router = require("express").Router();
const { render, routes } = require("../app");
const Celebrity = require("../models/Celebrity");
const Movie = require('../models/Movie')

router.get('/movies', (req, res, next) => {
    Movie.find()
    .populate('cast')
    .then(movieFromDB => {
        res.render('../views/movies/index.hbs', {movies: movieFromDB})
    })
    .catch(err => { next(err) })
})

router.get('/movies/:id/edit', (req, res, next) => {
    const id = req.params.id
    let cast = []

    Movie.findById(id)
    .populate('cast')
    .then(movieFromDB => {
        let cast = movieFromDB.cast
        const castId = cast.map(person => {
            return String(person._id)
        })
        Celebrity.find()
        .then(
            celebritiesFromDB => {
                let arr = celebritiesFromDB.map(celebrity => {
                    console.log('Celebrity ID: ' + celebrity._id)
                    console.log(castId.includes(celebrity._id))
                    if (castId.includes(String(celebrity._id))) {
                        return `<option value="${celebrity._id}" selected>${celebrity.name}</option>`
                    } else{
                        return `<option value="${celebrity._id}">${celebrity.name}</option>`
                    }
                })
                console.log(arr)
                console.log({castId})
                res.render('../views/movies/edit.hbs', {movie: movieFromDB, celebrities: arr})
            }
        )
        .catch(err => { next(err) })
    })
    
    .catch(err => { next(err) })
})
    
router.get('/movies/new', (req, res, next) => {
    console.log('movie get')
    Celebrity.find()
    .then(CelebritiesFromDB => {
        console.log(CelebritiesFromDB)
        res.render('../views/movies/new', {celebrities: CelebritiesFromDB})
    })
    .catch(err => { next(err) })
})

router.post('/movies', (req, res, next) => {
    const {title, genre, plot, cast} = req.body
    Movie.create({
        title,
        genre,
        plot,
        cast
    })
    .then(createdMovie => {
        console.log(createdMovie)
        res.redirect(`movies/${createdMovie._id}`)
    })
    .catch(err => { next(err) })
})

router.get('/movies/:id', (req, res, next) => {
    const id = req.params.id
    Movie.findById(id)
    .populate('cast')
    .then(movieFromDB => {
        res.render('../views/movies/show', {movie: movieFromDB})
    })
})


module.exports = router;