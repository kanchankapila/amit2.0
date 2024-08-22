const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  try {
    // Define different possible paths to the node_modules directory
    const possiblePaths = [
      path.resolve(__dirname, '../node_modules'), // one directory up
      path.resolve(__dirname, '../../node_modules'), // two directories up
      path.resolve(__dirname, '../../../node_modules'), // three directories up
      path.resolve(process.cwd(), 'node_modules') // process current working directory
    ];

    let nodeModulesPath;
    let files = null;

    // Try each path until you find the node_modules directory
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        nodeModulesPath = possiblePath;
        files = fs.readdirSync(nodeModulesPath);
        break;
      }
    }

    if (!files) {
      throw new Error('node_modules directory not found.');
    }

    // Return the file list in the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        node_modules: files,
        path: nodeModulesPath
      })
    };
  } catch (error) {
    console.error('Error reading node_modules directory:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
