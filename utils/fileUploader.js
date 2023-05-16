const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const FOLDER = process.env.FOLDER || 'uploads';
const PROVIDER = process.env.PROVIDER || 'local';
const CONFIG = process.env.CONFIG || './meldcx-386811-bc4b74604dbf.json';

// Configure Google Cloud Storage
const googleStorage = new Storage({
  projectId: 'meldcx-386811',
  keyFilename: CONFIG,
});

const bucket = googleStorage.bucket('meldCx');

// Configure Multer with the disk storage engine
const storage = multer.diskStorage({
  destination: FOLDER + '/',
  filename: function (req, file, cb) {
    // Rename the file as needed
    const originalName = file.originalname;
    const extension = originalName.split('.').pop();
    const filename =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + '.' + extension;
    cb(null, filename);
  },
});

// Define file type and size validation
const fileFilter = function (req, file, cb) {
  // Check file type
  if (!req.files) {
    return cb(new Error('File is missing'));
  }
  // if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
  //   return cb(new Error('Only JPG, JPEG, and PNG files are allowed'));
  // }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return cb(new Error('File size exceeds the maximum limit'));
  }

  // Validation passed
  cb(null, true);
};

const uploaderProvider = PROVIDER == 'local' ? storage : multer.memoryStorage();

let upload = multer({ storage: uploaderProvider, fileFilter });

module.exports = upload;
