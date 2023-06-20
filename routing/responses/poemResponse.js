const TextResponse = require('@responses/textResponse');
const PoemsService = require('@services/poems/poemsService');

module.exports = class PoemResponse extends TextResponse {

  async fetch() {
    const poemsService = new PoemsService();
    const poem = await poemsService.random();
    this.text = `Trochę poezji, wy niewrażliwi grubiańscy parweniusze:\n\n_${poem.author}_, *${poem.title}*\n\n${poem.lines.join("\n")}`;
  }

};
