const express = require('express');
const http = require('http');

const app = express();
// ... configure your Express app

// Export a function to start the server for testing
exports.startServer = function () {
  const server = http.createServer(app);
  return server.listen();
};

// Export the Express app for testing
exports.app = app;
