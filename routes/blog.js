var express = require('express');
var router = express.Router();
const Blogcontroller = require('../controller/blogcontroller');
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "."+ file.originalname.split('.').pop())
    }
})


const upload = multer({ storage: storage }) 

router.get('/read',Blogcontroller.SECURE,Blogcontroller.READ);
router.post('/create',Blogcontroller.SECURE,upload.array('image',2),Blogcontroller.CREATE);
router.put('/update/:id',Blogcontroller.SECURE,upload.array('image',2),Blogcontroller.UPDATE);
router.delete('/delete/:id',Blogcontroller.SECURE,Blogcontroller.DELETE);


module.exports = router;

