const Constants = require('@models/constants');
const iconv = require('iconv-lite');

const convertEncoding = (buffer, to) => iconv.decode(buffer, to);
const defaultRequestOptions = { binary: false, resultEncoding: false };

module.exports = (requester) => {
    return {

        request: (url, httpOptions, requestOptions = {}) => new Promise((resolve, reject) => {
            let chosenRequestOptions = {...defaultRequestOptions, ...requestOptions };
            console.log(chosenRequestOptions);
            const request = requester.request(
                url,
                httpOptions,
                response => {
                    if (response.statusCode < 200 || response.statusCode > 299) {
                        return reject(`Unexpected status code: ${response.statusCode}`);
                    }
                    if (chosenRequestOptions.binary) {
                        response.setEncoding('binary');
                        let data = [];
                        response.on('data', chunk => data.push(Buffer.from(chunk, 'binary')));
                        response.on('end', () => {
                            let resultData = Buffer.concat(data);
                            if (chosenRequestOptions.resultEncoding) {
                                resultData = convertEncoding(resultData, chosenRequestOptions.resultEncoding);
                            }
                            resolve(resultData);
                        });
                    } else {
                        let data = '';
                        response.on('data', chunk => data += chunk);
                        response.on('end', () => resolve(data));
                    }
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