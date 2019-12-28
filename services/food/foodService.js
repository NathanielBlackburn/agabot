const { InMemoryStore, FileStore, RestaurantsApi } = require('@ffp');
const RestaurantInfo = require('./restaurant');

module.exports = class FoodService {

    async randomRestaurant() {
        const store = await FileStore('./data/restaurants');
        const api = new RestaurantsApi(store);
        const restaurant = await api.randomRestaurant();
        return new RestaurantInfo(restaurant);
    }

};