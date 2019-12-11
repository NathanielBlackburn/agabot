const {google} = require('googleapis');

const createChat = () => {
  const auth = new google.auth.GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/chat.bot'
  });
  return google.chat({version: 'v1', auth: auth});
};

const spaces = {
  RandTesting: 'spaces/AAAA_I0dK3A',
  Pierdolety: 'spaces/AAAAjSq9YHU'
};

module.exports = class HangoutsChatService {

  static get Spaces() {
    return spaces;
  }

  async sendMessage(card, space) {
    return createChat().spaces.messages.create({
      parent: space,
      requestBody: card
    })
  }

  listSpaces() {
    return createChat().spaces.list();
  }

};
