const puppeteer = require('puppeteer');

const url = 'http://www.meijuhui.net/archives';

/**
 *
 * @param {puppeteer.Browser} browser
 * @param {string} keywords
 * @param {string} episode
 */
const scrape = async (browser, keywords, episode) => {
  const page = await browser.newPage();
  const [id, keyword] = keywords.split('/');

  await page.goto(encodeURI(`${url}/${id}.html`), {
    waitUntil: 'networkidle2',
  });

  try {
    const magnetLink = await page.evaluate(
      (keyword, episode) => {
        const title = Array.from(document.querySelectorAll('#dlist h2')).find(
          h2 => h2.textContent.match(keyword)
        );
        const index = Number(episode) - 1;
        const item = title.nextSibling.children[index];
        if (item) {
          return Array.from(item.children).find(a => a.href.includes('magnet')).href;
        }
      },
      keyword,
      episode
    );

    if (magnetLink) {
      console.log(`found link for ${id} episode ${episode}`, magnetLink);
    } else {
      console.log(`could not found link for ${id} episode ${episode}`);
    }

    return magnetLink;
  } catch (err) {
    console.error(`an error occurred while finding ${keywords}`, err);
    return;
  }
};

module.exports = scrape;
