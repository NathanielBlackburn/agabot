const TextResponse = require('@responses/textResponse');

module.exports = class TheJokeResponse extends TextResponse {

  async fetch() {
    this.text = [
        'Przychodzi facet do sklepu i mówi:',
        '- Czy są fafkulce?',
        'Sprzedawczyni dziwnie patrzy na faceta i mówi:',
        '- Nie. Dzisiaj nie mamy fafkulców.',
        'Następnego dnia facet znów przychodzi:',
        '- Dzień dobry. Są już może fafkulce?',
        'Sprzedawczyni na to:',
        '- Nie, nie ma.',
        'Facet codziennie przychodzi do tego sklepu i wciąż pyta o fafkulce. Pewnego dnia znów przychodzi.',
        '- Dzień dobry. Są fafkulce?',
        'Sprzedawczyni rozzłoszczona:',
        '- Witam. Nie, nie ma fafkulców i nie będzie!',
        'A facet na to:',
        '- Trudno. To poproszę fa w sprayu.',
        '🥁♫',
    ].join('\n');
  }

};
