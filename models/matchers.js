module.exports = {

  AintThatRight: /(?:co|no) nie\?/m,
  WhatsUp: /co tam/m,
  NoFuckup: /nie jeblo/m,
  Fuckup: /jeblo/m,
  WillNotFuckUp: /nie jebnie/m,
  WillFuckUp: /jebnie/m,

  Food: new RegExp(
    [
      'promk(?:a|e|i)',
      'pizz',
      'promocj(?:a|e|i)',
      'gondol(?:a|e|i)',
      'z?j(?:esc|adl|em|esz|edz)',
      '\\bw?szam(?:a|e)',
      'zam(?:awia|ow)',
      'glod',
      'jedzeni(?:e|a)',
      'food',
      'zarci(?:a|e)',
      'zr(?:e|y)c',
      'pazik',
      'pazi(?:em|o)',
      'pazzio',
      'chef',
      'szef',
    ].join('|'),
    'm'
  ),

  Joke: new RegExp(
    [
      'joke',
      'dowcip',
      'zart',
      'dad joke',
    ].join('|'),
    'm'
  ),

  Derbot: new RegExp(
    [
      'derbot',
      'strasburger',
      'suchar',
      'rak',
    ].join('|'),
    'm'
  ),
  GoodToBeBot: /dobrze (?:jest )?byc botem\?/m,
  NewDayNewPossibilities: /nowy dzien,? nowe mozliwosci/m,
  Weather: /weather|pogod(?:a|e|y)/m

};
