module.exports = class RestaurantInfo {

    constructor(data) {
        this.data = data;
    }

    info() {
        let result = '';

        result += "*Agabot i chujowe.pl polecają:*"
        result += ` <${this.data.url}|${this.data.name}>`;

        if (this.data.popular.length) {
            result += '\n\n*Plebs najczęściej wybiera:*\n'
            result += this.data.popular.map(meal => `${meal.name} za ${meal.price}zł\n`).join('');
        } else {
          result += '\n';
        }

        result += '\n*Znajdziesz tu:*\n'
        result += this.data.categories.map(category => `${category.name}\n`).join('');

        return result;

    }
}
