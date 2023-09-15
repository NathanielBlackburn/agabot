const vowels = ['a', 'e', 'i', 'o', 'u', 'y', 'ó', 'ą', 'ę'];
const exceptions = {
    unconditional: [
        'm.in.', 'itp.', 'itd.', 'np.', 'św.', 'w.', 'r.',
        'w', 'z', 'i', 'o', 'a', 'u',
    ],
    conditional: [
        'się', 'nie', 'na', 'do', 'to', 'że', 'jak', 'ale', 'po', 'co', 'tak', 'za', 'od', 'go', 'już', 'jego', 'jej', 'czy', 'przez', 'tylko',
        'tego', 'sobie', 'jeszcze', 'może', 'ze', 'kiedy', 'ich', 'dla', 'by', 'gdy', 'teraz', 'ja', 'ten', 'który', 'nawet', 'bardzo', 'przed',
        'tu', 'jednak', 'pod', 'coś', 'tam', 'wszystko', 'przy', 'więc', 'bo', 'nim', 'żeby', 'on', 'potem', 'też', 'jeśli', 'bez', 'nad', 'gdzie',
        'lecz', 'siebie', 'nigdy', 'ani', 'właśnie', 'sam', 'niż', 'jakby', 'aby', 'ty', 'no', 'albo', 'gdyby', 'aż', 'wtedy', 'przecież', 'jako',
        'chyba', 'nagle', 'czym', 'kto', 'dlaczego', 'także', 'mój', 'choć', 'ktoś', 'lub', 'niech', 'ku', 'którego', 'we', 'znowu', 'jakiś', 'tutaj',
        'tyle', 'między', 'również', 'znów', 'swoje', 'dlatego', 'zbyt', 'ciebie', 'taki', 'czego', 'iż', 'dopiero', 'obok', 'prawie', 'poza', 'zaś',
        'wciąż', 'jeżeli', 'moje', 'mimo', 'ponieważ', 'zaraz', 'coraz', 'podczas', 'zanim', 'cóż', 'każdy', 'my', 'dość', 'oraz', 'jaki', 'wcale',
        'wśród', 'zresztą', 'dziś', 'ile', 'chociaż', 'gdyż', 'kiedyś', 'swój', 'jedynie', 'pewno', 'nieco', 'niemal', 'gdzieś', 'jedno', 'wokół',
        'dużo', 'nadal', 'bowiem', 'przynajmniej', 'pewnie', 'często', 'niczego', 'dzięki', 'pewien', 'cicho', 'właściwie', 'wolno', 'oto', 'czasem',
        'stąd', 'wkrótce', 'całkiem', 'wówczas', 'mocno', 'trudno', 'skoro', 'wobec', 'rzeczywiście', 'tuż', 'daleko', 'spokojnie', 'czegoś', 'najpierw',
        'mało', 'wraz', 'równie', 'ponad', 'ciągle', 'inny', 'wyraźnie', 'ponownie', 'dzisiaj', 'kogoś', 'zwykle', 'jakoś', 'nasz', 'zapewne',
        'tymczasem', 'przede', 'nikogo', 'lekko', 'żaden', 'twój', 'wy', 'czymś', 'znacznie', 'następnie', 'och', 'zatem', 'jednocześnie', 'ach',
        'zamiast', 'czemu', 'natomiast', 'wiadomo', 'możliwe', 'głośno', 'podobnie', 'całkowicie', 'prosto', 'niewiele', 'zwłaszcza', 'spod', 'koło',
        'pomiędzy', 'dopóki', 'doskonale', 'niby', 'dotąd', 'kogo', 'przedtem', 'źle', 'ów', 'niestety', 'według', 'prawdopodobnie', 'choćby', 'czyli',
         'około', 'zaledwie', 'wzdłuż', 'przeciwko', 'ależ', 'ciężko', 'czasami', 'wszędzie', 'ledwie', 'owszem', 'dokąd', 'szczególnie', 'jakże',
         'zza', 'uważnie', 'wyłącznie', 'cokolwiek', 'akurat', 'naprzód', 'ni', 'wprawdzie', 'krótko', 'zgodnie', 'kiedykolwiek', 'oboje', 'dosyć',
         'szeroko', 'toteż', 'jednakże', 'przeciw', 'oprócz', 'zarówno', 'czyż', 'niezbyt', 'mnóstwo', 'obecnie', 'niezwykle', 'poważnie', 'podobno',
         'stamtąd', 'dziwnie', 'naturalnie', 'wręcz', 'ostatnio', 'póki', 'starannie', 'tamten', 'szkoda', 'widocznie', 'rzadko', 'sporo', 'pełen',
         'byle', 'ono', 'poprzez', 'zarazem', 'pomimo', 'nareszcie', 'kolejny', 'świetnie', 'ostatecznie', 'istotnie', 'otóż', 'niedawno', 'nigdzie',
         'nowo', 'nieraz', 'czyżby', 'delikatnie', 'zazwyczaj', 'pośród', 'niegdyś', 'dokoła', 'głównie', 'prócz', 'stale', 'niekiedy', 'absolutnie',
         'niedługo', 'niedaleko', 'równocześnie', 'pewny', 'ledwo', 'stanowczo', 'specjalnie', 'niewątpliwie', 'prędko', 'doprawdy', 'nazajutrz',
         'następny', 'przeciwnie', 'pośrodku', 'wystarczająco', 'miło', 'codziennie', 'początkowo', 'nerwowo', 'spośród', 'hej', 'niepewnie', 'naraz',
          'niechętnie', 'ażeby', 'odkąd', 'któryś', 'któż', 'ktokolwiek', 'stopniowo', 'ponadto', 'omal', 'owo', 'wszakże', 'komuś', 'znad', 'wszak',
          'ba', 'wasz', 'ona', 'ta', 'oni', 'ci', 'one', 'mi', 'bądź', 'te', 'sobą',
    ]
};

const srolate = (word, includeConditionals = false) => {
    if (!word.length) {
        return word;
    }

    let exceptionWords = exceptions.unconditional;
    if (includeConditionals) {
        exceptionWords = exceptionWords.concat(exceptions.conditional);
    }
    if (exceptionWords.includes(word)) {
        return word;
    }

    let pos = Math.min(...vowels.map((letter) => word.toLowerCase().indexOf(letter)).filter((pos) => pos >= 0));
    if (pos == Infinity) {
        return word;
    }

    const letter = word[pos];

    if (word.length > pos + 1 && letter.toLowerCase() == 'i' && vowels.includes(word[pos + 1].toLowerCase())) {
        pos += 1;
    }

    let result = `sr${word.slice(pos)}`;

    if (word[0].toUpperCase() == word[0]) {
        result = 'S' + result.slice(1);
        if (pos == 0 && word.toUpperCase() != word) {
            result = 'Sr' + result[2].toLowerCase() + result.slice(3);            
        }
    }

    return result;
};

const srolateText = (text = '') => {
    let result = text.trim();
    if (!result.length) {
        return result;
    }

    if (result.split(' ').count == 1) {
        return srolate(result, false);
    }

    return result.split(' ').map((word) => srolate(word, true)).join(' ');
};

module.exports = { srolate, srolateText };
