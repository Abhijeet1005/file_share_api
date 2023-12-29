var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({storage})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(fs.readdirSync('./'))
  
});

router.post('/', upload.single('file'),function(req, res, next) {
  if(!req.file) return res.status(400).json({error: "No file uploaded"})
  res.json({message: "File uploaded successfully", filename: req.file.filename})
});

module.exports = router;
