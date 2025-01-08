const BLOG = require('../model/blogschema');
const AUTHOR = require('../model/authorschema')
const path = require('path')
const fs = require('fs');
const jwt = require('jsonwebtoken');

exports.SECURE = async function (req, res, next) {
    try {

        const token = req.headers.authorization;
        if (!token) throw new Error("PLease Attche Token");

        const isvalidtoken = jwt.verify(token, "AUTHOR");
        req.author = isvalidtoken.id
        const tokenndata = await AUTHOR.findById(isvalidtoken.id);

        if (!tokenndata) throw new Error("ADMINTOKEN is not valid");

        next()

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        })
    }

}

exports.READ = async function (req, res, next) {

    try {
        const DATA = await BLOG.find({ authorId : req.author }).populate('authorId');

        res.status(201).json({
            status: "SUCCESS",
            message: "BLOG CREATE SUCCESFUL",
            Data: DATA,
        })

    } catch (error) {

        res.status(404).json({
            status: "error",
            message: error.message,
        })
    }
}

exports.CREATE = async function (req, res, next) {

    try {
        const { title, discription, author, category } = req.body;
        const images = req.files.map(file => file.filename);

        const DATA = await BLOG.create({
            title,
            discription,
            image: images,
            author,
            category,
            authorId: req.author,
        })

        res.status(201).json({
            status: "SUCCESS",
            message: "BLOG READ SUCCESFUL",
            Data: DATA,
        })

    } catch (error) {

        res.status(404).json({
            status: "error",
            message: error.message,
        })
    }
}

exports.UPDATE = async function (req, res, next) {

    try {

        const blogupdate = await BLOG.findById(req.params.id);
        if (!blogupdate) throw new Error("Blog ID Not Found");

        let updateimage;
        if (req.files && req.files.length > 0) {
            blogupdate.image.map(el => fs.unlinkSync(`./public/images/${el}`))
            updateimage = req.files.map(file => file.filename)
        }
        else {
            updateimage = blogupdate.image;
        }

        let updatedata = { ...req.body, image: updateimage };

        let blogdataupdate = await BLOG.findByIdAndUpdate(req.params.id, updatedata, { new: true })

        res.status(201).json({
            status: "SUCCESS",
            message: "BLOG UPDATE SUCCESFUL",
            Data: blogdataupdate,
        })

    } catch (error) {

        res.status(404).json({
            status: "error",
            message: error.message,
        })
    }
}

exports.DELETE = async function (req, res, next) {

    try {

        const blogdelete = await BLOG.findById(req.params.id);
        if (!blogdelete) throw new Error("Blog Not Found");

        blogdelete.image.map(el => fs.unlinkSync(`./public/images/${el}`))

        const DATA = await BLOG.findByIdAndDelete(req.params.id)

        res.status(201).json({
            status: "SUCCESS",
            message: "BLOG DELTE SUCCESFUL",
            Data: DATA,
        })

    } catch (error) {

        res.status(404).json({
            status: "error",
            message: error.message,
        })
    }
}