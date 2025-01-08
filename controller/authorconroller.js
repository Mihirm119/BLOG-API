const AUTHORMODEL = require('../model/authorschema');
const ADMIN = require('../model/adminschema')
const path = require('path')
const fs = require('fs');
const jwt = require('jsonwebtoken');


exports.SECURE = async function (req, res, next) {

    try {
        const token = req.headers.authorization;
        if (!token) throw new Error("PLease Attech Token");

        const isvalidtoken = jwt.verify(token, "ADMIN")
        const tokendata = await ADMIN.findById(isvalidtoken.id);

        if (!tokendata) throw new Error("ADMINTOKEN is not valid");
        next();

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        })
    }
}

exports.SIGNUP = async function (req, res, next) {
    try {

        const { name, email, password} = req.body;

        const DATA = await AUTHORMODEL.create({
            name,
            email,
            password,
            profile: req.file.filename,
        })

        res.status(201).json({
            status: "SUCCESS",
            message: "AUTHOR IS SIGNUP SUCCESSFUL",
            DATA
        })

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        })
    }

}


exports.LOGIN = async function (req, res, next) {
    try {

        const { email, password } = req.body;

        if (!email) throw new Error("Please Enter Email");
        if (!password) throw new Error("Please Enter password");

        const DATACHECK = await AUTHORMODEL.findOne({ email: email, password: password })
        if (!DATACHECK) throw new Error("Data IS Not Match");

        const token = jwt.sign({ id: DATACHECK._id }, "AUTHOR")

        res.status(201).json({
            status: "SUCCESS",
            message: "AUTHOR IS SIGNUP SUCCESSFUL",
            Token:token,
        })


    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        })
    }

}


exports.READ = async function (req, res, next) {
    try {

        const DATA = await AUTHORMODEL.find()

        res.status(201).json({
            status: "SUCCESS",
            message: "AUTHOR IS READ SUCCESSFUL",
            DATA
        })

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        })
    }

}


exports.UPDATE = async function (req, res, next) {
    try {
        const Authorupdate = await AUTHORMODEL.findById(req.params.id);
        if (!Authorupdate) throw new Error("Author ID is Not Found");

        if (req.file && Authorupdate.profile) {
            const filepath = `./public/author/${Authorupdate.profile}`;
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath)
            }
        }

        let updatedata = { ...req.body };
        if (req.body) {
            updatedata.profile = req.files.filename;
        }

        const DATA = await AUTHORMODEL.findByIdAndUpdate(req.params.id, updatedata, { new: true });

        res.status(200).json({
            status: "SUCCESS",
            message: "AUTHOR IS UPDATED SUCCESSFULLY",
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

        const Authordelete = await AUTHORMODEL.findById(req.params.id);
        if (!Authordelete) throw new Error("Author ID is Not Found");

        if (req.file && Authordelete.profile) {
            const filepath = `./public/author/${Authordelete.profile}`;
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath)
            }
        }

        const DATA = await AUTHORMODEL.findByIdAndDelete(req.params.id);

        res.status(201).json({
            status: "SUCCESS",
            message: "AUTHOR IS DELETE SUCCESSFUL",
        });

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        });
    }
};


