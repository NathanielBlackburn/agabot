const fs = require('fs').promises

const loadAllRestaurants = async path => {
    const files = await fs.readdir(path);
    return Promise.all(files.map(file => loadRestaurant(`${path}/${file}`)));
}

const loadRestaurant = async (file) => JSON.parse((await fs.readFile(file, 'utf-8')));

const prepareFilesMapping = async path => {
    const files = await fs.readdir(path);
    return (await Promise.all(files.map(async file => {
        const filename = `${path}/${file}`;
        const restaurant = await loadRestaurant(filename);
        return { [restaurant.details.id]: filename };
    }))).reduce((previous, current) => ({ ...previous, ...current }))
}

module.exports = { loadAllRestaurants, prepareFilesMapping, loadRestaurant }
