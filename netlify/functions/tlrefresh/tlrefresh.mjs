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
import { getStore } from '@netlify/blobs';

export const handler = async function (event, context) {
  let browser = null;

  try {
    const store = getStore("trendlyne");

    const executablePath = await chromium.executablePath;

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto('https://trendlyne.com/visitor/loginmodal/', {
      waitUntil: 'domcontentloaded',
    });

    await page.type('#id_login', process.env.TRENDLYNE_EMAIL);
    await page.type('#id_password', process.env.TRENDLYNE_PASSWORD);
    await page.click('form button[type="submit"]');
    await page.waitForTimeout(5000);

    const cookies = await page.cookies();

    let trnd = '', csrf = '';
    cookies.forEach(cookie => {
      if (cookie.name === '.trendlyne') trnd = cookie.value;
      if (cookie.name === 'csrftoken') csrf = cookie.value;
    });

    await store.set('trnd', trnd, { type: 'text' });
    await store.set('csrf', csrf, { type: 'text' });

    const savedTrnd = await store.get('trnd', { type: 'text' });
    const savedCsrf = await store.get('csrf', { type: 'text' });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Cookies saved and retrieved successfully',
        tokens: {
          set: { trnd, csrf },
          retrieved: { trnd: savedTrnd, csrf: savedCsrf },
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' },
    };
  } finally {
    if (browser) await browser.close();
  }
};
