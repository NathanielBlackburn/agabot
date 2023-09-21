module.exports = {

    AintThatRight: /(?:co|no) nie\?/m,
    WhatsUp: /co tam/m,
    NoFuckup: /nie jeblo/m,
    Fuckup: /jeblo/m,
    WillNotFuckUp: /nie jebnie/m,
    WillFuckUp: /jebnie/m,
    WhoOrdersFood: /kto (\b[^\s]+\s+)?zamawia\?/im,
    Horoscope: /horoskop (rak|ryby|panna|strzelec|waga|lew|koziorozec|bliznieta|wodnik|byk|skorpion|baran)/im,
    ChineseHoroscope: /horoskop (szczur|bawol|tygrys|krolik|smok|waz|kon|koza|malpa|kogut|pies|swinia)/im,

    Joke: new RegExp(
        [
            'joke',
            'dowcip',
            'zart',
            'dad joke',
        ].join('|'),
        'm'
    ),

    DerbotOLyzce: new RegExp(
        [
            'derbota? o lyzce',
            'dowcip o lyzce',
            'zart(?:em)? o lyzce',
            'suchara? o lyzce',
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
    Bookquote: new RegExp(
        [
            '(?:cytat',
            'cycat',
            'tacyt',
            'inspiruj',
            'inspiro',
            'inspirac',
            'motywac',
            'motywuj',
            'motywat)',
        ].join('|').concat(['(?:\\s+(.+))?']),
        'm'
    ),
    Poscigi: new RegExp(
        [
            'po(?:s|ś)cigi',
            'news',
            'g(?:o|ó)rski',
            'wiadomo(?:s|ś)ci',
            'maxmar',
        ].join('|'),
        'm'
    ),
    Sroler: /sroler(?:\s+(.+))?/s,
    Demotywatory: /demot/m,
    Fafkulce: /fafkulce/m,
    GoodToBeBot: /dobrze (?:jest )?byc botem\?/m,
    NewDayNewPossibilities: /nowy dzien,? nowe mozliwosci/m,
    Weather: /(?:weather|pogod(?:a|e|y))(?:\s+(.+))?/m,

};