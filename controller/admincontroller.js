const ADMIN = require('../model/adminschema')
const jwt = require('jsonwebtoken')


exports.SECURE = async function (req, res, next) {
    try {

        const token = req.headers.authorization;
        if(!token) throw new Error("PLease Attche Token");

        const isvalidtoken = jwt.verify(token,"ADMIN");
        const  tokenndata = await ADMIN.findById(isvalidtoken.id);

        if(!tokenndata) throw new Error("ADMINTOKEN is not valid");

        next()

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        })
    }

}

exports.SIGNUP = async function (req, res, next) {
    try {

        const { name, email, password, number } = req.body;

        const DATA = await ADMIN.create({
            name,
            email,
            password,
            number,
        })

        res.status(201).json({
            status: "SUCCESS",
            message: "ADMIN IS SIGNUP SUCCESSFUL",
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
        const userfind = await ADMIN.findOne({ email });

        if (!email) throw new Error("Please Enter Email");
        if (!password) throw new Error("Please Enter password");

        const DATACHECK = await ADMIN.findOne({ email: email, password: password })
        if (!DATACHECK) throw new Error("Data IS Not Match");
        
        const token = jwt.sign({ id: userfind._id }, "ADMIN")

        res.status(200).json({
            status: "SUCCESS",
            message: "ADMIN IS LOGIN SUCCESSFUL",
            token
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

        const READDATA = await ADMIN.find();


        res.status(200).json({
            status: "SUCCESS",
            message: "ADMIN READ SUCCESSFUL",
            ALLDATA: READDATA,
        })

    } catch (error) {
        res.status(404).json({
            status: "FAIL",
            message: error.message,
        })
    }
}