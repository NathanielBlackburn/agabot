module.exports = (requester) => {
  return {

    request: (url, options) => new Promise((resolve, reject) => {
      const request = requester.request(
        url,
        options,
        response => {
          if (response.statusCode < 200 || response.statusCode > 299) {
            return reject(`Status code: ${response.statusCode}`);
          }
          let data = '';
          response.on('data', chunk => data += chunk);
          response.on('end', () => resolve(data));
        }
      );
      request.on('error', reject);
      request.end();
    })

  };
};
