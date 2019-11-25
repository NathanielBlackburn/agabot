module.exports = class TextCard {

  constructor(text, thread) {
    this.text = text;
    if (typeof thread != 'undefined') {
      this.thread = {
        name: thread
      };
    }
  }

};
