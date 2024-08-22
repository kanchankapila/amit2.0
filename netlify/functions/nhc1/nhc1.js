const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  const walkSync = (dir, filelist = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        filelist = walkSync(filePath, filelist); // Recursively scan directories
      } else {
        filelist.push(filePath); // Add file to the list
      }
    });
    return filelist;
  };

  try {
    // Start from the root directory
    const rootDirectory = '/';
    const filesAndDirectories = walkSync(rootDirectory);

    return {
      statusCode: 200,
      body: JSON.stringify({
        filesAndDirectories
      }),
    };
  } catch (error) {
    console.error('Error reading files:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
