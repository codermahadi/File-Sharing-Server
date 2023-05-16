const crypto = require('crypto');

// Generate a lightweight key pair
const generateKeyPair = () => {
  // TODO: IF YOU NEED PEM FORMAT PRIVATE AND PUBLIC KEY THEN USE THIS
  // this is for pem format private and public key
  //   const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  //     modulusLength: 2048,
  //     publicKeyEncoding: {
  //       type: 'pkcs1',
  //       format: 'pem',
  //     },
  //     privateKeyEncoding: {
  //       type: 'pkcs1',
  //       format: 'pem',
  //     },
  //   });

  const privateKey = crypto.randomBytes(32).toString('hex'); // Generate a 32-byte private key
  const publicKey = crypto.randomBytes(32).toString('hex'); // Generate a 32-byte public key
  return { privateKey, publicKey };
};

module.exports = generateKeyPair;
