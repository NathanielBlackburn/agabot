const RestaurantsApi = require('./api/api');
const { InMemoryStore, FileStore } = require('./store/store');

module.exports = {
    FileStore: FileStore,
    InMemoryStore: InMemoryStore,
    RestaurantsApi: RestaurantsApi
}
