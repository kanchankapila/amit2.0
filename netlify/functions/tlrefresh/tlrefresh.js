// const chromium = require('@sparticuz/chromium');
// const puppeteer = require('puppeteer-core');
// const { getStore } = require('@netlify/blobs');

// exports.handler = async function(event, context) {
//   let browser = null;

//   try {
//     const store = getStore("trendlyne");

//     const executablePath = await chromium.executablePath;

//     browser = await puppeteer.launch({
//       args: chromium.args,
//       executablePath,
//       headless: chromium.headless,
//       ignoreHTTPSErrors: true,
//     });

//     const page = await browser.newPage();
//     await page.goto('https://trendlyne.com/visitor/loginmodal/', {
//       waitUntil: 'domcontentloaded',
//     });

//     await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
//     await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);
//     await page.click('form button[type="submit"]');
//     await page.waitForTimeout(5000);

//     const cookies = await page.cookies();

//     let trnd = '', csrf = '';
//     cookies.forEach(cookie => {
//       if (cookie.name === '.trendlyne') trnd = cookie.value;
//       if (cookie.name === 'csrftoken') csrf = cookie.value;
//     });

//     await store.set('trnd', trnd, { type: 'text' });
//     await store.set('csrf', csrf, { type: 'text' });

//     const savedTrnd = await store.get('trnd', { type: 'text' });
//     const savedCsrf = await store.get('csrf', { type: 'text' });

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         message: 'Cookies saved and retrieved successfully',
//         tokens: {
//           set: { trnd, csrf },
//           retrieved: { trnd: savedTrnd, csrf: savedCsrf }
//         }
//       }),
//       headers: { 'Content-Type': 'application/json' }
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message }),
//       headers: { 'Content-Type': 'application/json' }
//     };
//   } finally {
//     if (browser) await browser.close();
//   }
// }
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

const apiUrl = process.env.mongoapiurl;
const apiKey = process.env.mongoapikey; // Your MongoDB Data API key
const database = 'Trendlynecookie';
const collection = 'cookie';
const dataSource = 'Cluster0'; // Replace with your MongoDB cluster name if different

// Helper to detect local dev
const isLocal = !process.env.NETLIFY || process.env.NETLIFY_LOCAL === 'true';

export const handler = async function (event, context) {
  let browser = null;

  try {
    // Use local Chrome path if running locally, otherwise use chromium.executablePath
    let executablePath;
    if (isLocal) {
      const localChromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
      if (fs.existsSync(localChromePath)) {
        executablePath = localChromePath;
      } else {
        throw new Error('Local Chrome executable not found at ' + localChromePath);
      }
    } else {
      executablePath = await chromium.executablePath;
    }

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: isLocal ? false : chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto('https://trendlyne.com/visitor/loginmodal/?next=/features/', {
      waitUntil: 'domcontentloaded',
    });

    await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
    await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);
    console.log(process.env.TRENDLYNE_PASSWORD)
    await new Promise(res => setTimeout(res, 3000));
    // Click the button with visible text 'Login'
    const [loginButton] = await page.$x("//button[contains(., 'Login')]");
    if (loginButton) {
      await loginButton.click();
    } else {
      throw new Error("Login button with text 'Login' not found");
    }

    const cookies = await page.cookies();

    let trnd = '', csrf = '';
    cookies.forEach(cookie => {
      if (cookie.name === '.trendlyne') trnd = cookie.value;
      if (cookie.name === 'csrftoken') csrf = cookie.value;
    });
    console.log(trnd,csrf)

    // Insert trnd and csrf into MongoDB using Data API
    const insertPayload = {
      collection,
      database,
      dataSource,
      document: {
        trnd,
        csrf,
        time: new Date().toISOString(),
      },
    };

    const mongoResponse = await axios.post(
      `${apiUrl}/insertOne`,
      insertPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      }
    );
    console.log('MongoDB insert response:', mongoResponse.data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Cookies saved to MongoDB successfully',
        tokens: { trnd, csrf },
        mongoResult: mongoResponse.data,
      }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error('MongoDB insert error:', error.response ? error.response.data : error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' },
    };
  } finally {
    //  if (browser) await browser.close();
  }
};
