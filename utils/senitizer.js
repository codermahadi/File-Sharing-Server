const fs = require('fs');

const fileSenitizer = (items, publicKey) => {
  return items.filter((item) => {
    if (item.publicKey == publicKey) {
      let stream = fs.createReadStream(item.path); // making stream file
      delete item.fileSize; // remove fileSize
      delete item.privateKey; // remove privateKey
      delete item.publicKey; // remove publicKey
      delete item.createdAt; // remove createdAt,
      delete item.expiredAt; // remove createdAt,
      delete item.path; // remove path
      return (item.stream = stream);
    }
  });
};

module.exports = fileSenitizer;
