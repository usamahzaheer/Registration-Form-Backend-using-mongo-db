const mongoose = require('mongoose');

const userschema = new mongoose.Schema({

firstName: {
        type : String,
        required: true,
        min: 6,
        max: 255
    },

    lastName: {
        type : String,
        required: true,
        min: 6,
        max: 255
    },
    email : {
        type: String,
        required:true,
        max:255,
        min: 6
    },
    password : {
        type: String,
        required: true,
        max: 1024,
        min:6
    }

});

module.exports = mongoose.model('user', userschema);