const download = require('./download');
const client = require('./client');

(async () => {
  try {
    await Promise.all([
      download('magnet:?xt=urn:btih:4VPV6Y7A5LMCO34K2HUKCIBB57KM34TV', __dirname),
      download('magnet:?xt=urn:btih:5cee25e2c667f3b92c0107ab314e1c3f4db1c391', __dirname),
    ]);

    client.destroy();
      
  } catch (err) {
      console.log(err);
  }
})();

