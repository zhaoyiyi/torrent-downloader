const RSSParser = require('rss-parser');
const parser = new RSSParser();

const URL = 'https://share.dmhy.org/topics/rss/rss.xml?keyword=';

module.exports = async (_, name, episode) => {
  console.log(`fetching rss feed for ${name}`)
  const keyword = `${name} ${episode}`.replace(/\s/g, '+');
  const feed = await parser.parseURL(encodeURI(URL + keyword));
  const newest = feed.items[0];

  if (!newest) {
    console.log(`could not find anything for ${name}`);
    return;
  };
  
  return newest.enclosure.url;
}
