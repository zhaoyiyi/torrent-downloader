//@ts-check
const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'https://share.dmhy.org';

/**
 * 
 * @param {puppeteer.Browser} browser 
 * @param {string} name 
 * @param {string} episode 
 */
const scrape = async (browser, name, episode) => {
  const page = await browser.newPage();
  const keyword = `${name} ${episode}`;

  await page.goto(encodeURI(`${url}/topics/list?keyword=${keyword}`), {
    waitUntil: 'networkidle2',
  });

  console.log('opened list page');
  const detailsPage = await page.evaluate((name, episode) => {
    const title = document.querySelector('td.title');
    if (title) {
      return title.children[1].getAttribute('href');
    }
  });

  if (!detailsPage) {
    console.log(`could not find anything, keyword: ${keyword}`);
    return;
  }

  console.log('navigating to detail page', detailsPage);
  await page.goto(url + detailsPage, { waitUntil: 'networkidle2' });

  console.log('scraping magnet link...');
  const magnetLink = await page.evaluate(() => {
    return document.querySelector('.magnet').textContent;
  });

  console.log(magnetLink);

  return magnetLink;
};

module.exports = scrape;
