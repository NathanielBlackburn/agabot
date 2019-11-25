const GiphyService = require('@services/giphy/giphyService');
const WeatherService = require('@services/openWeatherMap/openWeatherMapService');
const HangoutsChatService = require('@services/hangoutsChat/hangoutsChatService');

const TextCard = require('@responses/responseCards/textCard');
const ImageCard = require('@responses/responseCards/imageCard');

const staticTexts = require('@models/staticTexts');

module.exports = {

  schedule: `30 6 * * *`,

  action: () => {
    const hangoutsChatService = new HangoutsChatService();
    const giphyService = new GiphyService();
    const weatherService = new WeatherService();
    const randTesting = HangoutsChatService.Spaces.Pierdolety;
    giphyService.get(GiphyService.Queries.NewDayNewPossibilities, async url => {
      const res = await hangoutsChatService.sendMessage(
        new TextCard(staticTexts.NewDayNewPossibilities),
        randTesting
      );
      const thread = res.data.thread.name;
      await hangoutsChatService.sendMessage(new ImageCard(url, false, thread), randTesting);
      await hangoutsChatService.sendMessage(new TextCard(`\n${staticTexts.TodaysWeather}`, thread), randTesting);
      weatherService.fetch(weather => {
        hangoutsChatService.sendMessage(new TextCard(weather.toString(), thread), randTesting);
      });
    });
  }

};
