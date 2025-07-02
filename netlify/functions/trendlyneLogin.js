import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import puppeteerExtra from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteerExtra.use(StealthPlugin());

// Helper to detect local dev
const isLocal = !process.env.NETLIFY || process.env.NETLIFY_LOCAL === 'true';

export const handler = async function (event, context) {
  let browser = null;
  try {
    // Use local Chrome path if running locally, otherwise use chromium.executablePath
    let executablePath;
    if (isLocal) {
      const localChromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
      const fs = await import('fs');
      if (fs.existsSync(localChromePath)) {
        executablePath = localChromePath;
      } else {
        throw new Error('Local Chrome executable not found at ' + localChromePath);
      }
    } else {
      executablePath = await chromium.executablePath;
    }

    browser = await puppeteerExtra.launch({
      args: chromium.args,
      executablePath,
      headless: isLocal ? false : chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto('https://trendlyne.com/visitor/loginmodal/', {
      waitUntil: 'domcontentloaded',
    });

    // Use credentials from environment variables
    const email = process.env.TRENDLYNE_EMAIL;
    const password = process.env.TRENDLYNE_PASSWORD;
    if (!email || !password) {
      throw new Error('TRENDLYNE_EMAIL and TRENDLYNE_PASSWORD must be set in environment variables');
    }

    await page.waitForSelector('#id_login');
    await page.type('#id_login', email, { delay: 120 });
    await page.waitForSelector('#id_password');
    await page.type('#id_password', password, { delay: 120 });
    // Click the button with visible text 'Login'
    const [loginButton] = await page.$x("//button[contains(., 'Login')]");
    if (loginButton) {
      await loginButton.click();
    } else {
      throw new Error("Login button with text 'Login' not found");
    }
    await page.waitForTimeout(5000); // Wait for login to complete

    const cookies = await page.cookies();
    let trnd = '', csrf = '';
    cookies.forEach(cookie => {
      if (cookie.name === '.trendlyne') trnd = cookie.value;
      if (cookie.name === 'csrftoken') csrf = cookie.value;
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ trnd, csrf }),
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