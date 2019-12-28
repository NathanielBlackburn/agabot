const { ListedItem, RestaurantInfo, MealInfo } = require('./model');

const popularMeals = restaurant => {
    const popular = restaurant.menu.popular;
    if (!popular.length) {
        return []
    }

    return restaurant.menu.meals
        .filter(meal => restaurant.menu.popular.includes(meal.productId))
        .map(meal => new MealInfo(meal.name, meal.price));
}

const sortById = (first, second) => first.id - second.id;

module.exports = class RestaurantsApi {
    
    constructor(store) {
        this.store = store;
    }

    async listRestaurants() {
        const restaurants = await this.store.allRestaurants();
        return restaurants
            .map(restaurant => new ListedItem(restaurant.details.id, restaurant.details.name))
            .sort(sortById);
    }

    async restaurantsByFood(food) {
        const restaurants = await this.store.restaurantsByFood(food)
        return restaurants.map(restaurant => new ListedItem(restaurant.details.id, restaurant.details.name))
            .sort(sortById);
    }

    async restaurantInfo(id) {
        const restaurant = await this.store.restaurantById(id);
        const popular = popularMeals(restaurant);
        const categories = Object.values(restaurant.menu.categories).map((categoryName, index) => new ListedItem(index, categoryName)).sort(sortById);
        return new RestaurantInfo(restaurant.details.name, restaurant.details.url, categories, popular);
    }

    async randomRestaurant() {
        const restaurants = await this.store.allRestaurants();
        const restaurantsIds = restaurants.map(restaurant => restaurant.details.id);
        const randomId = restaurantsIds[Math.floor(Math.random() * restaurantsIds.length)];
        return this.restaurantInfo(randomId);
    }

    async menuFromCategory(restaurantId, categoryIndex) {
        const restaurant = await this.store.restaurantById(restaurantId);
        const categoryId = Object.keys(restaurant.menu.categories)[categoryIndex];
        if (!categoryId) {
            throw Error(`Bad category index! ${categoryIndex}`);
        }

        return restaurant.menu.meals
            .filter(meal => meal.categoryId === categoryId)
            .map(meal => new MealInfo(meal.name, meal.price));
    }

}