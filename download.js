const fs = require('fs');
const throttle = require('lodash/throttle');

const client = require('./client');

const log = torrent =>
  throttle(() => {
    console.log(torrent.files[0].name);
    console.log(torrent.progress * 100);
    console.log(`${torrent.downloadSpeed / 1000}kb/s`);
  }, 1000);

module.exports = (url, path) => {
  console.log('adding torrent ' + url);
  return new Promise((resolve, reject) => {
    return client.add(url, { path }, torrent => {
      console.log('added ' + torrent.files[0].name);
      torrent.on('download', log(torrent));
      torrent.on('error', err => reject(err));
      torrent.on('done', () => resolve());
    });
  });
};
