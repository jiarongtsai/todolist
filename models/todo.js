const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    done:{
        type: Boolean,
        require: true,
        default: false
    },
    date:{
        type: Date,
        require: true
    }
})

module.exports = mongoose.model('Todo', todeSchema)