const path = require('path');
const puppeteer = require('puppeteer');

const download = require('./download');
const client = require('./client');
const tasks = require('./tasks.json');

const DOWNLOAD_PATH = path.resolve(__dirname, 'downloads');

const start = async () => {
  const browser = await puppeteer.launch();
  Object.entries(tasks).map(async ([scraperName, show]) => {
    const scrape = require(path.resolve(__dirname, 'scrapers', scraperName));

    // scrape show for with selected scraper
    Object.entries(show).map(async ([showName, episode]) => {
      console.log(showName);
      const url = await scrape(browser, showName, episode);
      if (url) {
        await download(url, DOWNLOAD_PATH);
      }
    });
  });
};

start();
