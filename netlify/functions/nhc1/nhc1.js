const fs = require('fs');
const path = require('path');

exports.handler = async function (event, context) {
  try {
    // Define the path to the node_modules directory
    const nodeModulesPath = path.resolve(__dirname, '../node_modules');
    const tmpPath = path.resolve(__dirname, '../tmp');

    // Read the contents of the node_modules directory
    const files = fs.readdirSync(nodeModulesPath);
    const files1 = fs.readdirSync(tmpPath);

    // Check for specific subdirectory (e.g., @sparticuz or puppeteer-core)
    const sparticuzPath = path.resolve(nodeModulesPath, '@sparticuz');
    const puppeteerCorePath = path.resolve(nodeModulesPath, 'puppeteer-core');
    const tPath = path.resolve(tmpPath, 'chromium');
   
    const tPathFiles = fs.existsSync(tPath) ? fs.readdirSync(tPath) : 'chromium file does not exist';
    const sparticuzFiles = fs.existsSync(sparticuzPath) ? fs.readdirSync(sparticuzPath) : 'Directory does not exist';
    const puppeteerCoreFiles = fs.existsSync(puppeteerCorePath) ? fs.readdirSync(puppeteerCorePath) : 'Directory does not exist';

    // Return the file list in the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        node_modules: files,
        '@sparticuz': sparticuzFiles,
        'puppeteer-core': puppeteerCoreFiles,
        'tmp':tPathFiles
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
