/**
 * This creates a model for Identity.
 * It uses the schema from mongoose to create 
 * each property in the identity model, 
 * it also validates the properties.
 * Then it exports it.
 */

const mongoose = require('mongoose');

let IdentitySchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            minLength: 5,
            trim: true
        },
        name: {
            type: String,
            required: true,
            minLength: 1,
            trim: true
        },
        country: {
            type: String,
            required: true,
            minLength: 1,
            trim: true
        }
    },
    { collection: 'identities' }
)

// this will make the email field always unique
IdentitySchema.index({ email: 1 }, { unique: true })

const Identity = mongoose.model('Identity', IdentitySchema)

module.exports = Identity