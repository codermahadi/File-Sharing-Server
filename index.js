require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const deleteExpiredFiles = require('./job/deleteExpiredFiles');
const PORT = process.env.PORT || 3001;
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || '*/10 * * * *';

// Cors
app.use(cors());

app.use(express.static('public'));
app.use(express.json());

// Schedule the file deletion job
cron.schedule(CRON_SCHEDULE, () => {
  console.log('Running job to delete expired files...');
  deleteExpiredFiles();
});

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/files', require('./routes/files.js'));

app.listen(PORT, console.log(`Listening on port ${PORT}.`));
