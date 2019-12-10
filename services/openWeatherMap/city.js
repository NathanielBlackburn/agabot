module.exports = class City {

  constructor(name) {
    switch (name) {
      case 'gdyni':
        this.id = '3099424';
        this.name = 'Gdyni';
        break;
      default:
        this.id = '7532225';
        this.name = 'Zielonej Górze';
    }
  }

};
