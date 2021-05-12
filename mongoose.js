/**
 * This exposes a function that connects to the 
 * mongo database.
 * If something is wrong with the connection, it'll exit the app
 * */
const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log('Mongodb connected succesfully')
    } catch (err) {
        console.error(err.message)

        // exit with failure
        process.exit(1)
    }
}

module.exports = connectDB