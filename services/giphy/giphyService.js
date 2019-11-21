const https = require('https');

module.exports = class GiphyService {

  get(query, callback) {
    const giphyRequest = https.request(
      `https://api.giphy.com/v1/gifs/random?api_key=UhO7LyQbGUAXNtq9nkWlhXOuDCJsPtvH&rating=r&tag=${query.randomTag}`,
      {},
      giphyResponse => {
        let data = '';
        giphyResponse.on('data', chunk => data += chunk);
        giphyResponse.on('end', () => {
          console.log('----GIPHY------');
          // console.log(data);
          console.log('---GIPHY END---');
          let json = JSON.parse(data);
          let url = json.data.image_original_url;
          console.log(url);
          callback(url);
        });
      }
    );
    giphyRequest.end();
  }

};
