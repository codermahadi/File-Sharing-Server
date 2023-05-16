const { startServer, app } = require('../test-setup');
const request = require('supertest')(startServer());
const FormData = require('form-data');
const fs = require('fs');
const assert = require('assert');
const axios = require('axios');

describe('file Shareing Server Test', () => {
  let publicKey = '';
  let privateKey = '';
  it('should upload a file', async () => {
    const formData = new FormData();
    formData.append('files', fs.createReadStream('./test.jpg')); // attach the file using form-data

    const response = await axios({
      method: 'post',
      url: 'http://localhost:3001/files',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Assert the response and perform necessary checks
    assert.strictEqual(response.status, 201);
    assert.ok(response.data);
    publicKey = response.data.publicKey;
    privateKey = response.data.privateKey;
    console.log(
      'API: Upload response assertions passed successfully',
      response.data
    );
    after(() => {
      // Close the server after all tests are completed
      startServer().close();
    });
  });

  it('should get uploaded files', async () => {
    console.log('publickey', publicKey);
    const response = await axios.get(
      'http://localhost:3001/files/' + publicKey
    );

    // Assert the response and perform necessary checks
    assert.strictEqual(response.status, 200);
    assert.ok(response.data);
    console.log(
      'API: Get with publicKey param response assertions passed successfully',
      response.data.files
    );
    after(() => {
      // Close the server after all tests are completed
      startServer().close();
    });
  });

  it('should delete a file', async () => {
    console.log('privateKey', privateKey);

    const response = await axios.delete(
      'http://localhost:3001/files/' + privateKey
    );

    // Assert the response and perform necessary checks
    assert.strictEqual(response.status, 202);
    assert.ok(response.data);
    console.log(
      'API: Delete response assertions passed successfully',
      response.data
    );
    after(() => {
      // Close the server after all tests are completed
      startServer().close();
    });
  });
});
