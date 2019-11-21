module.exports = {

  removeDiacritics: (text) => {
    const diacriticsMap = {
      'ą': 'a',
      'ę': 'e',
      'ó': 'o',
      'ś': 's',
      'ł': 'l',
      'ż': 'z',
      'ź': 'z',
      'ć': 'c',
      'ń': 'n'
    };
    return text.split('').map(char => diacriticsMap[char] || char).join('');
  }

};
