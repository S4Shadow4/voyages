const express = require('express');
const multer = require('multer');
const router = express.Router();
const multerConfig = require('../multer-config');
const addAnnoncesController = require('../Controllers/addAnnoncesController');

router.post('/register', multerConfig, addAnnoncesController.addAnnonces);
router.post('/add', multerConfig, addAnnoncesController.addLieuxTouristiques);
router.get('/getAnnonces',addAnnoncesController.getAnnonces)
router.get('/getLieuxTouristiques',addAnnoncesController.getLieuxTouristiques)

module.exports = router;
