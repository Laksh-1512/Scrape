const puppeteer = require('puppeteer');

const username = "Murphy_123";
const urlLeetcode = `https://leetcode.com/${username}/`;

const leetcodeRating = async (urlLeetcode) => {
  try {
    const browser = await puppeteer.launch({ headless: false }); // Launch in non-headless mode to see what's happening
    const page = await browser.newPage();

    // Go to the LeetCode profile page
    await page.goto(urlLeetcode, { waitUntil: 'networkidle2' });

    // Wait for the element with the required class to load (escaping ":" and spaces)
    await page.waitForSelector('div.text-label-1.dark\\:text-dark-label-1.flex.items-center.text-2xl', { timeout: 30000 });

    
    // Scrape the content of the element
    const rating = await page.evaluate(() => {
      return document.querySelector('div.text-label-1.dark\\:text-dark-label-1.flex.items-center.text-2xl').innerText.trim();
    });

    console.log('Rating:', rating);  // Log the rating to the console

    await browser.close();  // Close the browser
  } catch (err) {
    console.log("Error fetching LeetCode rating:", err);
  }
}

leetcodeRating(urlLeetcode);
