const fs = require('fs');
const data = 'data.json';

// Define the function to delete expired files
const deleteExpiredFiles = () => {
  // Get the current timestamp
  const currentTimestamp = new Date();
  // Read the JSON file
  fs.readFile(data, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
    // Parse the JSON data
    let items = JSON.parse(data);
    // Find the objects in the array with matching IDs
    const files = items.filter(
      (item) => new Date(item.expiredAt) <= currentTimestamp
    );
    // Delete the image files
    files.forEach((file) => {
      const filePath = file.path;
      // IF File path is setting
      if (filePath) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          }
          console.log(`File "${file.path}" deleted successfully`);
        });
      }
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
  });
};

module.exports = deleteExpiredFiles;
