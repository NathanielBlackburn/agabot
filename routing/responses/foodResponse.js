const TextResponse = require('@responses/textResponse');
const FoodService = require('@services/food/foodService');

module.exports = class FoodResponse extends TextResponse {

    constructor(responseHandler) {
        super(responseHandler, '');
    }

    async fetch() {
        const foodService = new FoodService();
        const restaurant = await foodService.randomRestaurant();
        this.text = restaurant.info();
    }

};