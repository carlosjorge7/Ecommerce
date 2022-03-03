const express = require('express');
const uploadCtrl = require('../controllers/upload.controller');
const router = express.Router();

router.post('/', uploadCtrl.upload, uploadCtrl.uploadFile);
router.get('/:id', uploadCtrl.getUpload);

module.exports = router;