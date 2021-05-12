// import the packages for this project
const _ = require('lodash')
const express = require('express')
require('dotenv').config()
const connectDB = require('./mongoose') // this is a function I created for db connection
const Identity = require('./identity_model') // this is a mongoose model

const { PORT } = process.env
// call the this method to perform the connection to the database
connectDB()

// initialize a new express instance
const app = express()

// this is the middleware config. It helps parse the request body to JSON
app.use(express.json({ extended: true }));

// the routes for the api
// this is the root of the application
// app.get('/', (req, res) => {
//     res.sendFile('./identity.pdf', { root: '.' }) // TODO change this 
// })

// creates the data from the user
// the request body must not be empty
// be careful when creating an Identity, mongodb is case sensitive
app.post('/identity', async (req, res) => {
    if (_.isEmpty(req.body)) {
        return res.status(404).send('Error: The request body should not be empty!')
    }

    // you can use this Identity model to perform database operations
    Identity.create({ ...req.body }, (err, doc) => {
        if (err)
            return res.status(500).send(err.message)
        return res.status(200).json({
            message: 'Identity created successfully',
            data: doc
        })
    })

})

// gets the data created by the user using url parameters
// if no parameter is provided, it returns all the records in the database
app.get('/identity', (req, res) => {
    // this handy .pick method inserts only the available parameters into the filter object
    let filter = _.pick(req.query, ["email", "name", "country"])

    Identity.find(filter, (err, docs) => {
        if (err)
            return res.status(500).send(err.message)
        else if (docs === null)
            return res.status(500).send('Error: No document was found that matches the query')
        return res.json({ message: `${docs.length || 0} Document(s) found`, data: docs })
    })
})

// gets the data created using the id
// if a wrong id is specified, it returns an error message
app.get('/identity/:id', (req, res) => {
    let id = req.params.id;

    Identity.findById(id, (err, doc) => {
        if (err)
            return res.status(400).send('Error: Please make sure that your id is correct')
        else if (doc === null)
            return res.status(500).send('Error: No document was found that matches the query')
        return res.json({ message: `Document found`, data: doc })
    })
})

// updates the data created by the user using a filter
// the new data should be in the request body
// it will search for the data using the filter or query params, 
// then update only the first returned doc with the request body
app.patch('/identity', (req, res) => {
    let body = _.pick(req.body, ["email", "name", "country"])
    let filter = _.pick(req.query, ["email", "name", "country"])

    if (_.isEmpty(body))
        return res.status(400).send('Error: The request body should not be empty!')
    if (_.isEmpty(filter))
        return res.status(400).send('Error: You must add at least one "Identity" query parameter.')

    // updates the first document that matches the filter
    Identity.updateOne(filter, { $set: body }, { new: true }, (err, doc) => {
        if (err)
            return res.status(500).send(err.message)
        else if (doc === null)
            return res.status(500).send('Error: No document was found that matches the query')
        return res.json({ message: 'Update successful', data: doc })
    })
})

// updates the data that matches the given id
// the new data must be in the req.body
app.patch('/identity/:id', (req, res) => {
    if (_.isEmpty(req.body))
        return res.status(400).send('Error: The request body should not be empty!')

    let body = _.pick(req.body, ["email", "name", "country"])
    let id = req.params.id

    Identity.findByIdAndUpdate(id, { $set: body }, { new: true }, (err, doc) => {
        if (err)
            return res.status(500).send('Error: Please make sure that your id is correct')
        else if (doc === null) return res.status(500).send('Update request failed. Could not ' +
            'find any document matching that id')
        return res.json({ message: 'Update request successful', data: doc })
    })
})

// deletes data using the filter provided in the query params
app.delete('/identity', (req, res) => {
    let filter = _.pick(req.query, ['email', 'name', 'country'])

    if (_.isEmpty(filter))
        return res.status(400).send('Error: You must add at least one "Identity" query parameter.' +
            ' Only me, the creator, can delete all records at once!')

    Identity.deleteMany(filter, (err, doc) => {
        if (err)
            return res.status(500).send(err.message)
        return res.json({ message: `${doc.deletedCount || 0} document(s) deleted succesfully`, data: doc })
    })
})

// deletes the data using the id
app.delete('/identity/:id', (req, res) => {
    let id = req.params.id

    Identity.findByIdAndDelete(id, (err, doc) => {
        if (err)
            return res.status(500).send('Error: Please make sure that your id is correct')
        else if (doc === null)
            return res.status(500).send('Error: No document was found that matches the query')
        return res.json({ message: 'Delete request successful', data: doc })
    })
})

// listen and serve the application
app.listen(PORT, () => { console.log(`Server started successfully on port ${PORT}`) })