const Celebrity = require('../models/Celebrity')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/boilerplate')

const celebrities = [
    {
        name: 'famous person',
        occupation: 'actriss',
        catchPhrase: 'hello world'
    },
    {
        name: 'very famous person',
        occupation: 'singer',
        catchPhrase: 'hello express'
    },
    {
        name: 'quite person',
        occupation: 'football player',
        catchPhrase: 'u.n.v.e.U.'
    }
]

Celebrity.insertMany(celebrities)
.then(celebrities => {
    console.log(`Success - added ${celebrities.length} celebrities to the db`)
    mongoose.connection.close()
})
.catch(err => {
    console.log(err)
})