const { loadAllRestaurants, prepareFilesMapping, loadRestaurant } = require('./load');

class AbstractStore {

    async restaurantsByFood(food) {
        const restaurants = await this.allRestaurants();
        const normalizedFood = food.toLowerCase();
        const foodInRestaurantName = (restaurant) => restaurant.details.name.toLowerCase().includes(normalizedFood);
        const foodInAnyCategoryName = (restaurant) => Object.values(restaurant.menu.categories).find(category => category.toLowerCase().includes(normalizedFood));
        const foodInAnyMealName = (restaurant) => restaurant.menu.meals.find(meal => meal.name.toLowerCase().includes(normalizedFood));
        return restaurants.filter(restaurant => foodInRestaurantName(restaurant)
            || foodInAnyCategoryName(restaurant)
            || foodInAnyMealName(restaurant))
    }

}

class InMemoryStore extends AbstractStore {

    constructor(restaurants) {
        super();
        this.restaurants = restaurants;
    }

    async allRestaurants() {
        return this.restaurants;
    }

    async restaurantById(id) {
        const restaurant = this.restaurants.find(restaurant => restaurant.details.id === id);

        if (!restaurant) {
            throw new Error(`No restaurant with id ${id}`);
        }

        return restaurant;
    }

}

class FileStore extends AbstractStore {

    constructor(path) {
        super();
        this.path = path;
        this.filesMapping = undefined;
    }

    async allRestaurants() {
        return loadAllRestaurants(this.path);
    }

    async restaurantById(id) {
        await this._prepareFilesMapping();
        
        let restaurant;
        const file = this.filesMapping[id];

        if (file) {
            restaurant = loadRestaurant(file);
        }

        if (!restaurant) {
            throw new Error(`No restaurant with id ${id}`);
        }

        return restaurant;
    }

    async _prepareFilesMapping() {
        if (!this.filesMapping) {
            this.filesMapping = await prepareFilesMapping(this.path)
        }
    }
}

module.exports = {

    InMemoryStore: async (path) => {
        const data = await loadAllRestaurants(path);
        return new InMemoryStore(data);
    },

    FileStore: async (path) => {
        return new FileStore(path);
    }

}