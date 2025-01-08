const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AUTHOR = new Schema({
    name: {
        type: String,
        require: [true, 'Name is Required , PLease Enter  a Name'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: [true, 'Email is require , PLease Enter a Email'],
        trim: true,
    },
    password:{
        type:String,
        require: [true, 'Password is require , PLease Enter a Password'],
        trim: true,
    },
    profile:{
        type:String,
       require: [true, 'Profile is require , PLease Enter a Profile'],
    },
})

const AUTHORMODEL = mongoose.model('AUTHOR',AUTHOR)

module.exports = AUTHORMODEL;