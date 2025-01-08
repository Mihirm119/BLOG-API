const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CATEGORY = new Schema({
    name: {
        type: String,
        require: [true, 'Name is Required , PLease Enter  a Name'],
        trim: true,
        unique: true
    },
    discription: {
        type: String,
        require: [true, 'discription is require , PLease Enter a discription'],
        trim: true,
    },
    image:{
        type:[String],
        require: [true, 'image is require , PLease Enter a images'],
    },
})

const category = mongoose.model('Category',CATEGORY)

module.exports = category;