 const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    match: {
        name: String, 
        games: Number,
        sets: Number,
        name1: String,
        games1: Number,
        sets1: Number
    }
})

mongoose.model('Match', matchSchema);