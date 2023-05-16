const fs = require('fs');
const router = require('express').Router();
// Require the request limiter middleware module
const limitRequests = require('../middleware/limitRequester');
const generateKeyPair = require('./../utils/generateKeyPair');
const fileSenitizer = require('./../utils/senitizer');
const upload = require('./../utils/fileUploader');
const EXPIRED_TIME = process.env.EXPIRED_TIME || 1;
const data = 'data.json';

// Get EndPoint
router.get('/:publicKey', limitRequests(10, 'download'), (req, res) => {
  const publicKey = req.params.publicKey; // Access the 'publicKey' route parameter

  if (!publicKey) {
    res.status(402).json({ error: 'public key is missing' });
  }

  // Read the JSON file
  fs.readFile(data, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
    // Parse the JSON data
    let items = JSON.parse(data);
    const files = fileSenitizer(items, publicKey);
    res.status(200).json({ files });
  });
});

// Insert EndPoint
router.post(
  '/',
  upload.array('files'),
  limitRequests(20, 'upload'),
  (req, res) => {
    // Check Files is exist or not
    if (!req.files) {
      return res.status(400).json({
        error: 'File missing',
      });
      // Check Files values exist or not
    } else if (req.files.length < 1) {
      return res.status(400).json({
        error: 'File missing',
      });
    }
    const { privateKey, publicKey } = generateKeyPair();

    // Read the JSON file
    fs.readFile(data, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        return;
      }

      // Parse the JSON data
      let items = JSON.parse(data);

      const currentDate = new Date();
      const expiredAt = new Date(currentDate.getTime() + EXPIRED_TIME * 1000);

      // Perform modifications to the files array
      req.files.forEach((file) => {
        items.push({
          privateKey,
          publicKey,
          path: file.path,
          mimetype: file.mimetype,
          fileSize: file.size,
          createdAt: currentDate,
          expiredAt: expiredAt,
        });
      });
      // Convert the modified files array back to JSON string
      let jsonContent = JSON.stringify(items, null, 2);

      // Write the updated JSON content back to the file
      fs.writeFile('data.json', jsonContent, 'utf8', (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
          return;
        }

        console.log('JSON file updated successfully');
      });
    });

    return res.status(201).json({ privateKey, publicKey });
  }
);

// Delete EndPoint
router.delete('/:privateKey', (req, res) => {
  const privateKey = req.params.privateKey; // Access the 'publicKey' route parameter

  if (!privateKey) {
    res.status(402).json({ error: 'Prvate key is missing' });
  }

  // Read the JSON file
  fs.readFile(data, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    // Parse the JSON data
    let items = JSON.parse(data);
    // Find the objects in the array with matching IDs
    const files = items.filter((item) => item.privateKey == privateKey);

    // Delete the image files
    files.forEach((file) => {
      const filePath = file.path;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
        console.log(`File "${file.path}" deleted successfully`);
      });
    });

    //Remove the objects from the array
    files.forEach((fileToRemove) => {
      const index = items.indexOf(fileToRemove);
      items.splice(index, 1);
    });

    let jsonContent = JSON.stringify(items, null, 2);

    // Write the updated JSON content back to the file
    fs.writeFile('data.json', jsonContent, 'utf8', (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return;
      }
      console.log('JSON file updated successfully');
    });

    res.status(202).json({ result: 'Files are succesfully deleted' });
  });
});

module.exports = router;
