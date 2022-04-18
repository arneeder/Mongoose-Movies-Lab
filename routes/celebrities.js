const router = require("express").Router();
const { render } = require("../app");
const Celebrity = require('../models/Celebrity')

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new')
})

router.get('/celebrities/:id/edit', (req, res, next) => {
    const id = req.params.id
    Celebrity.findById(id)
        .then(celebrity => {
            res.render('celebrities/edit', {celebrity: celebrity})
        })
        .catch(err => { next(err) })
})

router.get('/celebrities/:id', (req, res, next) => {
    console.log('run celebrity detail route')
    const id = req.params.id
    Celebrity.findById(id)
        .then(celebrity => {
            res.render('celebrities/show', {celebrity: celebrity})
        })
        .catch(err => { next(err) })
})

router.post('/celebrities/:id', (req, res, next) => {
    const id = req.params.id
    const {name, occupation, catchPhrase} = req.body
    Celebrity.findByIdAndUpdate(id, {
        name,
        occupation,
        catchPhrase
    }, {new: true})
        .then(celebrity => {
            console.log(celebrity)
            res.redirect(`/celebrities/${celebrity._id}`)
        })
        .catch(err => { next(err) })
})

router.post('/celebrities', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({
        name,
        occupation,
        catchPhrase
    })
    .then(createdCelebrity => {
        console.log(createdCelebrity)
        res.redirect(`celebrities/${createdCelebrity._id}`)
    })
    .catch(err => { next(err) })
})

router.post('/celebrities/:id/delete', (req, res, next) => {
    const id = req.params.id
    Celebrity.findByIdAndRemove(id)
        .then(
            res.redirect('/celebrities')
        )
        .catch(err => { next(err) })
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(celebrities => {
        console.log(celebrities)
        res.render('../views/celebrities/index.hbs', { celebrities: celebrities })
    })
    .catch(err => { next(err) } )
})

module.exports = router;