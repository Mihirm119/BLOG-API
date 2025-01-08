var express = require('express');
var router = express.Router();
const authorcontroller = require('../controller/authorconroller')

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/author')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "."+ file.originalname.split('.').pop())
    }
  })

  
const upload = multer({ storage: storage })
  
/* GET users listing. */
router.get('/read',authorcontroller.SECURE,authorcontroller.READ);
router.post('/signup',upload.single('profile'), authorcontroller.SIGNUP);
router.post('/login', authorcontroller.LOGIN);
router.put('/update/:id', upload.single('profile'), authorcontroller.UPDATE);
router.delete('/delete/:id',authorcontroller.SECURE, authorcontroller.DELETE);

module.exports = router;