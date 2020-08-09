const mongoose = require('mongoose')

const Schema = mongoose.Schema

const companySchema = new Schema({
    name: {type: String, required: true},
    scores: {
        env: {type: Number, required: true},
        com: {type: Number, required: true},
        char: {type: Number, required: true},
        div: {type: Number, required: true},
    }
})

const Company = mongoose.model('Company', companySchema)

module.exports = Company