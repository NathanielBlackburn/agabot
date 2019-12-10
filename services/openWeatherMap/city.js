module.exports = class City {

  constructor(name) {
    switch (name) {
      case undefined:
      case 'zielona gora':
        this.id = '7532225';
        this.name = 'Zielonej Górze';
        break;
      case 'gdynia':
        this.id = '3099424';
        this.name = 'Gdyni';
        break;
      default:
        this.id = -1;
    }
  }

};
