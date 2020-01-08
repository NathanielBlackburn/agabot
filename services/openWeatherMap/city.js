module.exports = class City {

  static get Grunberg() {
    return new City('zielona gora');
  }

  static get Gdynia() {
    return new City('gdynia');
  }

  static get Sulechow() {
    return new City('sulechow');
  }

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
      case 'sulechow':
        this.id = '3084241';
        this.name = 'Sulechowie';
        break;
      default:
        this.id = -1;
    }
  }

};
