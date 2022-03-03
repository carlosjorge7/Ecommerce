const uploadCtrl = {};
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

const upload = multer({storage: storage});

uploadCtrl.upload = upload.single('myFile');

uploadCtrl.uploadFile = (req, res) => {
  console.log(req.file);
  res.status(200).json({ message: 'Imagen guardada' });
}

uploadCtrl.getUpload = (req, res) => {
  
}

module.exports = uploadCtrl;
