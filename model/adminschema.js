const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ADMINSCHEMA = new Schema({
    name:{
        type:String,
        require:[true,'Name is Required , PLease Enter  a Name'],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        require:[true,'email is Required , PLease Enter  a Email'],
        trim:true,
    },
    password:{
        type:String,
        require:[true,'password is Required , PLease Enter  a Password'],
        trim:true,

    },
    number:{
        type:String,
        require:[true,'number is Required , PLease Enter  a Number'],
        trim:true,
    }
})

const  ADMIN = mongoose.model('ADMIN',ADMINSCHEMA);

module.exports = ADMIN