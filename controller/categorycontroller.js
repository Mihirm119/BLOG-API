const categoryMODEL = require('../model/categoryschema');
const ADMIN = require('../model/adminschema')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs');

exports.SECURE = async function (req, res, next) {

    try {
        const token = req.headers.authorization;
        if (!token) throw new Error("PLease Attech Token");

        const isvalidtoken = jwt.verify(token, "ADMIN")
        const tokendata = await ADMIN.findById(isvalidtoken.id);

        if (!tokendata) throw new Error("ADMINTOKEN is not valid");

        next()

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        })
    }
}


exports.CREATE = async function (req, res, next) {
    try {
        const { name, discription } = req.body;
        const images = req.files.map(file => file.filename);

        const DATA = await categoryMODEL.create({
            name,
            discription,
            image: images,
        })

        res.status(201).json({
            status: "SUCESSS",
            meassage: "CATEGORY CREATE SUCESSFUL",
            DATA
        })

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            meassage: error.message,
        })
    }
}

exports.READ = async function (req, res, next) {
    try {

        const DATA = await categoryMODEL.find()

        res.status(201).json({
            status: "SUCESSS",
            meassage: "CATEGORY READ SUCESSFUL",
            DATA
        })

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            meassage: error.message,
        })
    }
}

exports.UPDATE = async function (req, res, next) {
    try {

        const categoryupdate = await categoryMODEL.findById(req.params.id);
        if (!categoryupdate) throw new Error("Category ID is Not Found");

        if (req.files && req.files.length > 0 && categoryupdate.image) {
            for (const image of categoryupdate.image) {
                const filepath = `./public/category/${image}`;
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            }
        }

        let updatedata = { ...req.body };

        if (req.files && req.files.length > 0) {
            updatedata.image = req.files.map(file => file.filename); // Store new filenames in the database
        }

        const DATA = await categoryMODEL.findByIdAndUpdate(req.params.id, updatedata, { new: true });

        res.status(200).json({
            status: "SUCCESS",
            message: "CATEGORY IS UPDATED SUCCESSFULLY",
            DATA
        });

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        });
    }
};





exports.DELETE = async function (req, res, next) {
    try {

        const categorydelete = await categoryMODEL.findById(req.params.id);
        if (!categorydelete) throw new Error("Category ID is Not Found");

        if (req.file && categorydelete.profile) {
            const filepath = `./public/author/${categorydelete.profile}`;
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath)
            }
        }

        const DATA = await categoryMODEL.findByIdAndDelete(req.params.id);

        res.status(201).json({
            status: "SUCESSS",
            meassage: "CATEGORY DELETE SUCESSFUL",
        })

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            meassage: error.message,
        })
    }
}