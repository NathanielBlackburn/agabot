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

    Food: new RegExp(
        [
            'promk(?:a|e|i)',
            'pizz',
            'promocj(?:a|e|i)',
            'z?j(?:esc|adl|em|esz|edz)',
            '\\bw?szam(?:a|e)',
            'zam(?:awia|ow)',
            'glod',
            'jedzeni(?:e|a)',
            'food',
            'zarci(?:a|e)',
            'zr(?:e|y)c',
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

    DerbotOLyzce: new RegExp(
        [
            'derbota? o lyzce',
            'dowcip o lyzce',
            'zart(?:em)? o lyzce'
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
    Fafkulce: /fafkulce/m,
    GoodToBeBot: /dobrze (?:jest )?byc botem\?/m,
    NewDayNewPossibilities: /nowy dzien,? nowe mozliwosci/m,
    Weather: /(?:weather|pogod(?:a|e|y))(?:\s+(.+))?/m

};