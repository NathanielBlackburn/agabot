const symbols = {
  Bolo: Symbol('bolo'),
  Izek: Symbol('izek'),
  Unknown: Symbol('unknown')
};

module.exports = class User {

  static get Bolo() {
    return symbols.Bolo;
  }

  static get Izek() {
    return symbols.Izek;
  }

  static get Unknown() {
    return symbols.Unknown;
  }

  static create(email) {
    switch (email.trim().toLowerCase()) {
      case 'f.kotwicki@cinkciarz.pl':
        return symbols.Bolo;
        break;
      case 'k.rataj@cinkciarz.pl':
        return symbols.Izek;
        break;
      default:
        return symbols.Unknown;
    }
  }

};
