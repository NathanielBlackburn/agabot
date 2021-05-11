const matchers = require('@models/matchers');
const ChineseHoroscopeResponse = require('@responses/chineseHoroscopeResponse');

module.exports = class ChineseHoroscopeResponder {

    respondsTo(message, user, originalMessage) {
        this.message = message;
        this.originalMessage = originalMessage;
        return message.match(matchers.ChineseHoroscope) != null;
    }

    async respond(responseHandler) {
        const sign = this.message.match(matchers.ChineseHoroscope)[1];
        await (new ChineseHoroscopeResponse(responseHandler, sign)).send();
    }

};