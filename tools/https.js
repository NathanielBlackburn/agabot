const Constants = require('@models/constants');
const axios = require('axios');

module.exports = {

    request: async (url, httpOptions = {}) => {
        let axiosConfig = { ...{ responseType: 'text', timeout: 1.5 * Constants.Interval.Second }, ...httpOptions };
        return (await axios.get(url, axiosConfig)).data;
    }
};
