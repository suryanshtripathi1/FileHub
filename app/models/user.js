const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    cpfnumber: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'customer'}
}, {timestamps: true})

module.exports = mongoose.model('User', userSchema)