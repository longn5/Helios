const mongoose = require('mongoose');

const RegisterSchema = mongoose.Schema({
    id: Number,
    fullName: String,
    email: String,
    dateOfBrith: String,
    favoriteFiveInegers: [],
    emailOptIn: Boolean,
    timeOfRegisteration: Number
})

module.exports = mongoose.model('Register', RegisterSchema);