const Constants = require('@models/constants');

module.exports = (requester) => {
  return {

    request: (url, options) => new Promise((resolve, reject) => {
      const request = requester.request(
        url,
        options,
        response => {
          if (response.statusCode < 200 || response.statusCode > 299) {
            return reject(`Unexpected status code: ${response.statusCode}`);
          }
          let data = '';
          response.on('data', chunk => data += chunk);
          response.on('end', () => resolve(data));
        }
      );
      request.setTimeout(30 * Constants.Interval.Second, () => {
        request.abort();
      });
      request.on('error', reject);
      request.end();
    })

  };
};
