const NodeCache = require('node-cache');

module.exports = class CachedService {

  static get cacheParams() {
    return {
      ttl: 0,
      checkPeriod: 0
    };
  }

  get cacheKey() {
    return 'cacheKey';
  }

  static get cache() {
    if (!this.hasOwnProperty('_cache')) {
      this._cache = new NodeCache({
        stdTTL: this.cacheParams.ttl,
        checkperiod: this.cacheParams.checkPeriod
      });
    }
    return this._cache;
  }

  async get() {
    let data = this.constructor.cache.get(this.cacheKey);
    if (data) {
      return data;
    } else {
      data = await this.fetch();
      this.set(data);
      return data;
    }
  }

  set(data) {
    this.constructor.cache.set(this.cacheKey, data);
  }

  async fetch() {
    return new Promise((resolve, reject) => {
      reject('Not implemented.');
    });
  }

  static flushCache() {
    this.cache.flushAll();
  }

};
