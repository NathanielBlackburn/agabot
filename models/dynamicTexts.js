const arrayToolkit = require('@tools/arrayToolkit');

module.exports = class {

  static get OfCourse() {
    const responses = [
      'No rejczel.', 'No kurwa!', 'No raczej, nie inaczej.', 'Jacha blacha.', 'Zgadzam się.',
      'Potwierdzam.', 'To, że tak powiem, prawda.', 'Podzielam twą opinię.', 'Nie. Tzn. tak!',
      'Tak było, nie ściemniam.',
    ];
    return arrayToolkit.randomElement(responses);
  }

  static get DontUnderstand() {
    const responses = [
      'Ja nie rozumieć, bwana mówić wolniej.',
      'Daj mi spokój! FX nie działa, a ten z botem sobie pogaduszki ucina.',
      'To jest typowy problem współbieżności dostępu do danych, który dotyczy wszystkich systemów IT z centralną bazą danych. Różne systemy w różny sposób sobie z tym radzą. Generalnie to co widzisz powyżej to typowa obsługa takiego błędu. Więc to nie jest żaden bug. Jedynie czego bym się przyczepił to że pole komentarza zostało wyczyszczone. To faktycznie niemiła niespodzianka. Ale ogólnie można powiedzieć że takie zachowanie systemu nie jest błędem.',
    ];
    return arrayToolkit.randomElement(responses);
  }

  static MarcinOrdersFood(name) {
    const responses = [
      'Dziś zamawia [chosenName], więc bierzecie na własne ryzyko.',
      'Dziś zamawia [chosenName], więc macie przegibane.',
      'Dziś zamawia [chosenName], więc dajcie mu swoje wsparcie.',
      'Dziś zamawia [chosenName], więc zamówcie 4h wcześniej.',
      'Dziś zamawia [chosenName], więc tak bardzo mi was szkoda.',
    ];
    return arrayToolkit.randomElement(responses).replace('[chosenName]', name);
  }

  static TodaysWeather(city) {
    return `*Pogoda na dziś w ${city.name}:*`
  }

  static TodaysWeatherCrapCity(city) {
    return `*Nie wiem, kogo to obchodzi, ale jest też chuja warte info o pogodzie w ${city.name}:*`;
  }

};
