const arrayToolkit = require('@tools/arrayToolkit');

class GiphyQuery {

  constructor(tagList) {
    this.tagList = tagList;
  }

  get randomTag() {
    return arrayToolkit.randomElement(this.tagList);
  }

}

module.exports = {

  Jeblo: new GiphyQuery(['explosion', 'fail', 'failure', 'disaster', 'crash', 'burning', 'plane+crash', 'drama']),
  Jebnie: new GiphyQuery(['anticipation', 'fear', 'scared', 'waiting', 'anxious']),
  NieJeblo: new GiphyQuery(['woohoo', 'awesome', 'fuck+yeah']),
  NewDayNewPossibilities: new GiphyQuery(['lets do this', 'happy day', 'brand new day', 'new possibilities', 'lets go'])

};
