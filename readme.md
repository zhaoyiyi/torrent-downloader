# Torrent downloader
Scrapes the website and download predefined items.

## Config
Create a `tasks.json` in the following format
```json
{
  "scraperFileName": {
    "keyword": "episodeNumber",
  }
}
```

* `scraperFileName`: name of the file in `./scrapers`. It should export a function that takes `browser`, `keyword`, and `episodeNumber` as parameters
* `keyword`: keyword that is passed to scraper when scrape
* `episodeNumber`: number of the most recent downloaded episode. It is updated(+1) when the app downloads something with the keyword.

## Example `tasks.json`
```json
{
  "dmhy": {
    "我的英雄学院 第三季 1080p": "05",
    "澄空学园 女神异闻录5 MP4 720p": "05"
  }
}
```