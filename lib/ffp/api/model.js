class ListedItem {

    constructor(id, name) {
        this.id = id
        this.name = name;
    }

}

class RestaurantInfo {

    constructor(name, url, categories, popularMeals) {
        this.name = name;
        this.categories = categories;
        this.url = url;
        this.popular = popularMeals;
    }

}

class MealInfo {
    
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

}

module.exports = {
    ListedItem,
    RestaurantInfo,
    MealInfo
}