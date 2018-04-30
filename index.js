const path = require('path');
const download = require('./download');
const client = require('./client');
const tasks = require('./tasks.json');

Object.entries(tasks).map(async ([scraperName, show]) => {
  const scrape = require(path.resolve(__dirname, 'scrapers', scraperName))
  
  // scrape show for with selected scraper
  Object.entries(show).map(async ([showName, episode]) => {
    const url = await scrape(showName, episode);
    await download(url, __dirname);
  })
});

