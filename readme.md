# Torrent downloader
Search and download pre-defined torrents

1. add `tasks.json`(see below)
2. `node index`

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
  "dmhy.rss": {
    "boku no hero academia 1080p s03": "05",
    "persona 5 the animation 1080p big5": "05"
  }
}
```