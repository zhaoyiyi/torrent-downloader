const path = require('path');
const puppeteer = require('puppeteer');
const fs = require('fs');

const TASKS_JSON = './tasks.json';

const download = require('./download');
const client = require('./client');
const { nextEpisodeNumber, groupEntries } = require('./utils');
const tasks = require(TASKS_JSON);

const DOWNLOAD_PATH = path.resolve(__dirname, 'downloads');

// scrape and download items
const runScraper = async (browser, scrape, item) => {
  const taskEntries = await Promise.all(
    Object.entries(item).map(async ([keyword, episode]) => {
      const downloadLink = await scrape(browser, keyword, episode);
      if (downloadLink) {
        await download(downloadLink, DOWNLOAD_PATH);
        return [keyword, nextEpisodeNumber(episode)];
      }

      return [keyword, episode];
    })
  );

  return groupEntries(taskEntries);
};

const start = async () => {
  const browser = await puppeteer.launch();
  // run all scrapers
  const newTasks = await Promise.all(
    Object.entries(tasks).map(async ([scraperName, items]) => {
      const scrape = require(path.resolve(__dirname, 'scrapers', scraperName));

      const updatedItems = await runScraper(browser, scrape, items);
      return [scraperName, updatedItems];
    })
  );

  // update task json file
  const json = JSON.stringify(groupEntries(newTasks), null, 2);
  fs.writeFileSync(TASKS_JSON, json);

  client.destroy(() => {
    process.exit();
  });
  
};

start();
