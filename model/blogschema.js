const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BLOG = new Schema({
    title: {
        type: String,
        require: [true, 'title is Required , PLease Enter  a title'],
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
    author:{
       type:String,
       require: [true, 'author is require , PLease Enter a author'],
       trim: true,
    },
    date:{
      type:Date,
      default:Date.now,
    },
    category:{
        type:String,
        require: [true, 'category is require , PLease Enter a category'],
        trim: true,
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'AUTHOR' 
    },
})

const BLOGSCHEMA = mongoose.model('BLOG',BLOG)

module.exports = BLOGSCHEMA;