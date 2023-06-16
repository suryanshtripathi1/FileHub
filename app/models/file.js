const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fileSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true,},
    title: {type: String, required: true},
    description: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('File', fileSchema)