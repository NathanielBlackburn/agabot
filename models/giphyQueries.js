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

  NieJebnie: new GiphyQuery(['fingers crossed', 'for sure', 'keep calm', 'stay calm']),
  Jebnie: new GiphyQuery(['anticipation', 'fear', 'scared', 'waiting', 'anxious']),
  NieJeblo: new GiphyQuery(['woohoo', 'awesome', 'fuck+yeah']),
  Jeblo: new GiphyQuery(['explosion', 'fail', 'failure', 'disaster', 'crash', 'burning', 'plane+crash', 'drama']),
  NewDayNewPossibilities: new GiphyQuery(['lets do this', 'happy day', 'brand new day', 'new possibilities', 'lets go'])

};
