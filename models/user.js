const {
  createHash,
} = require('crypto');

const symbols = {
  Bolo: Symbol('bolo'),
  Izek: Symbol('izek'),
  Unknown: Symbol('unknown')
};

module.exports = class User {

  constructor(email, symbol) {
    this.email = email;
    this.symbol = symbol;
  }

  static get Bolo() {
    return new User('f.kotwicki@cinkciarz.pl', symbols.Bolo);
  }

  static get Izek() {
    return new User('k.rataj@cinkciarz.pl', symbols.Izek);
  }

  static create(email) {
    switch (email.trim().toLowerCase()) {
      case 'f.kotwicki@cinkciarz.pl':
        return this.Bolo;
        break;
      case 'k.rataj@cinkciarz.pl':
        return this.Izek;
        break;
      default:
        return new User(email, symbols.Unknown);
    }
  }

  get hash() {
    const settings = require('@tools/settings');
    const userSettings = settings.apiConfig.user;
    const hash = createHash('sha256');
    hash.update(`${userSettings.hashPreSalt}${this.email}${userSettings.hashPostSalt}`);
    return hash.digest('hex');
  }

};
