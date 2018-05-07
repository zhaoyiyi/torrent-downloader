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

  await page.screenshot({ path: 'screenshot.png', height: 2000 });
  try {
    const magnetLink = await page.evaluate(
      (keyword, episode) => {
        const title = Array.from(document.querySelectorAll('#dlist h2')).find(
          h2 => h2.textContent.match(keyword)
        );
        const index = Number(episode) - 1;
        const item = title.nextSibling.children[index];
        return item && item.children[1] && item.children[1].href;
      },
      keyword,
      episode
    );
    console.log(magnetLink);
    return magnetLink;
  } catch (err) {
    console.log(`could not find E${episode}`, err);
    return;
  }
};

module.exports = scrape;
