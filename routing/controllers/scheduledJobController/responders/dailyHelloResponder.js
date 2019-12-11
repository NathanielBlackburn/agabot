const GiphyService = require('@services/giphy/giphyService');
const WeatherService = require('@services/openWeatherMap/openWeatherMapService');
const HangoutsChatService = require('@services/hangoutsChat/hangoutsChatService');

const City = require('@services/openWeatherMap/city');
const TextCard = require('@responses/responseCards/textCard');
const ImageCard = require('@responses/responseCards/imageCard');

const staticTexts = require('@models/staticTexts');

module.exports = class DailyHelloResponder {

  respondsTo(jobName) {
    return jobName == 'dailyHello';
  }

  respond(responseHandler) {
    responseHandler.status(204).end();
    const hangoutsChatService = new HangoutsChatService();
    const giphyService = new GiphyService();
    const weatherService = new WeatherService(City.Grunberg);
    const space = HangoutsChatService.Spaces.Pierdolety;
    giphyService.get(GiphyService.Queries.NewDayNewPossibilities, async url => {
      const res = await hangoutsChatService.sendMessage(
        new TextCard(staticTexts.NewDayNewPossibilities),
        space
      );
      const thread = res.data.thread.name;
      await hangoutsChatService.sendMessage(new ImageCard(url, false, thread), space);
      await hangoutsChatService.sendMessage(new TextCard(`\n${staticTexts.TodaysWeather}`, thread), space);
      weatherService.fetch(weather => {
        hangoutsChatService.sendMessage(new TextCard(weather.toString(), thread), space);
      });
    });

  }
};
