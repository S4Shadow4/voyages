const multer = require('multer');

// Configuration du stockage des fichiers uploadés
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'files');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = file.mimetype.split('/')[1];
    const myfileName = name + '_' + Date.now() + '.' + extension; 
    callback(null, myfileName);
  },
});
module.exports = multer({ storage }).single('file'); 

/* const multer = require('multer');
const path = require('path');

// Configuration du stockage des fichiers uploadés
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'files');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = path.extname(name);
    const myfileName = name + '_' + Date.now() + extension; 
    callback(null, myfileName);
  },
});

module.exports = multer({ storage }).single('file'); */

