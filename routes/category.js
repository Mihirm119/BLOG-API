var express = require('express');
var router = express.Router();
const multer  = require('multer');
const categorycontroller = require('../controller/categorycontroller')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/category')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "."+ file.originalname.split('.').pop())
    }
})

const upload = multer({ storage: storage }) 

router.get('/read',categorycontroller.SECURE,categorycontroller.READ);
router.post('/create', categorycontroller.SECURE,upload.array('image',2),categorycontroller.CREATE);
router.put('/update/:id',categorycontroller.SECURE,upload.array('image',2),categorycontroller.UPDATE);
router.delete('/delete/:id',categorycontroller.SECURE,categorycontroller.DELETE);

module.exports = router;