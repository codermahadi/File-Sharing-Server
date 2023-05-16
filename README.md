# MeldCx File Sharing Server

## Technologies

- [Nodejs 18.16.0 latest version] (https://nodejs.org/en/download)
- NPM 9.5.1

## Features

- Feature 1: Upload Your Files
- Feature 2: You Can get files by publicKey
- Feature 3: Also Delete files by PublicKey
- Feature 4: File Upload and Download daily limit added and also you can increase and decrease limit
- Feature 4: Also we have internal job for cleanup expired files and information

## Installation

1. Download from the google drive
2. Navigate to the project directory: `cd your-project`
3. Install dependencies: `npm install`
4. Install dependencies: `npm start` for run
5. Install dependencies: `npm test` for test

## Usage

1. Modify the configuration file in the `.env` directory to fit your needs.
2. Run the application: `npm start`
3. Access the application in your browser at: `http://localhost:3001`

## Configuration

The following configuration options are available in the `.env` file:

- Option 1: You can modify PORT number here.
- Option 2: You can modify FOLDER for change file store directory name.
- Option 3: You can modify PROVIDER for storage provider like local or google.
- Option 4: DAILY_DOWNLOAD_LIMIT define increase and decrease limit.
- Option 5: DAILY_UPLOAD_LIMIT define increase and decrease limit.
- Option 6: EXPIRED_TIME define file expire time in a second.
- Option 6: CONFIG define google cloud store creadentials.
- Option 6: CRON_SCHEDULE define internal job time.

## Information

basically i have try to implement google cloud store but i don't have any paid account but i have configured for GCS.
I also try to my best. Thank You for your interesting Project.

[![Codermahadi](https://github.com/codermahadi)
[![linkdin](https://www.linkedin.com/in/mahadi-hasan-606548103/)
