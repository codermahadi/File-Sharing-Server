// Define an object to store request counts per IP address
const downloadCounts = {};
const uploadCounts = {};

// Define a middleware function to limit network traffic
// requestLimit: How many request you accept for download or upload
// requestType: here we can get upload or download string
const limitRequests = (requestLimit, requestType) => {
  return (req, res, next) => {
    const ipAddress = req.ip;

    // Check if the request type download or upload
    if (requestType === 'download') {
      if (!downloadCounts[ipAddress]) {
        // Check if the IP address exists in the requestCounts object
        // If it doesn't exist, initialize the count to 1
        downloadCounts[ipAddress] = 1;
      } else {
        // If it exists, increment the count
        downloadCounts[ipAddress]++;
      }
    } else {
      if (!uploadCounts[ipAddress]) {
        // Check if the IP address exists in the requestCounts object
        // If it doesn't exist, initialize the count to 1
        uploadCounts[ipAddress] = 1;
      } else {
        // If it exists, increment the count
        uploadCounts[ipAddress]++;
      }
    }

    // Check if the count exceeds the limit (e.g., 10 requests per minute)
    const timeLimit = 60 * 1000; // 1 minute

    // Check if the request type download or upload
    if (
      requestType === 'download' &&
      downloadCounts[ipAddress] > requestLimit
    ) {
      // If the limit is exceeded, return an error response
      return res.status(429).json({
        message: 'Your daily download limit is over for this IP',
      });
    } else if (
      requestType === 'upload' &&
      uploadCounts[ipAddress] > requestLimit
    ) {
      // If the limit is exceeded, return an error response
      return res
        .status(429)
        .json({ message: 'Your daily upload limit is over for this IP' });
    }

    // Reset the request count after the time limit
    // if (requestType === 'download') {
    //   setTimeout(() => {
    //     downloadCounts[ipAddress] = 0;
    //   }, timeLimit);
    // } else {
    //   setTimeout(() => {
    //     uploadCounts[ipAddress] = 0;
    //   }, requestLimit);
    // }

    // If the limit is not exceeded, continue to the next middleware or route handler
    next();
  };
};

module.exports = limitRequests;
