const NodeCache = require('node-cache');

module.exports = class CachedService {

  static get cacheParams() {
    return {
      ttl: 0,
      checkPeriod: 0,
      key: 'cacheKey'
    };
  }

  static get cache() {
    if (!this.hasOwnProperty('_cache')) {
      this._cache = new NodeCache({
        stdTTL: this.cacheParams.ttl,
        checkperiod: this.cacheParams.checkPeriod
      })
    }
    return this._cache;
  }

  get(callback) {
    const data = this.constructor.cache.get(this.constructor.cacheParams.key);
    if (data) {
      callback(data);
    } else {
      this.fetch((data) => {
        this.set(data);
        callback(data);
      });
    }
  }

  set(data) {
    this.constructor.cache.set(this.constructor.cacheParams.key, data);
  }

  fetch(callback) {
    throw new Error('Not implemented.');
  }

};
