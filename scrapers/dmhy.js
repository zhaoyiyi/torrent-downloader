//@ts-check
const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'https://share.dmhy.org';

const scrape = async (name, episode) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(encodeURI(`${url}/topics/list?keyword=${name} ${episode}`), {
    waitUntil: 'networkidle0',
  });

  console.log('opened list page');
  const detailsPage = await page.evaluate((name, episode) => {
    const title = document.querySelector('td.title');
    return title.children[1].getAttribute('href');
  });

  console.log('navigating to detail page', detailsPage);
  await page.goto(url + detailsPage, { waitUntil: 'networkidle0' });

  console.log('taking screenshot..');
  fs.writeFileSync('screenshot.jpg', await page.screenshot({ fullPage: true }));

  console.log('scraping magnet link...');
  const magnetLink = await page.evaluate(() => {
    return document.querySelector('.magnet').textContent;
  });

  console.log(magnetLink);

  return magnetLink;
};

module.exports = scrape;
