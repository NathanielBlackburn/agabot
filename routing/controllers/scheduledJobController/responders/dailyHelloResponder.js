const GiphyService = require('@services/giphy/giphyService');
const WeatherService = require('@services/openWeatherMap/openWeatherMapService');
const HangoutsChatService = require('@services/hangoutsChat/hangoutsChatService');

const City = require('@services/openWeatherMap/city');
const TextCard = require('@responses/responseCards/textCard');
const ImageCard = require('@responses/responseCards/imageCard');

const staticTexts = require('@models/staticTexts');
const dynamicTexts = require('@models/dynamicTexts');

module.exports = class DailyHelloResponder {

  respondsTo(jobName) {
    return jobName == 'dailyHello';
  }

  async respond(responseHandler) {
    responseHandler.status(204).end();
    const hangoutsChatService = new HangoutsChatService();
    const giphyService = new GiphyService();
    const weatherServiceGrunberg = new WeatherService(City.Grunberg);
    const weatherServiceGdynia = new WeatherService(City.Gdynia);
    const weatherServiceSulechow = new WeatherService(City.Sulechow);
    const space = HangoutsChatService.Spaces.Pierdolety;
    const threadData = await hangoutsChatService.sendMessage(new TextCard(staticTexts.NewDayNewPossibilities), space);
    const thread = threadData.data.thread.name;
    const url = await giphyService.get(GiphyService.Queries.NewDayNewPossibilities);
    await hangoutsChatService.sendMessage(new ImageCard(url, false, thread), space);
    const weatherGrunberg = await weatherServiceGrunberg.get();
    const weatherGdynia = await weatherServiceGdynia.get();
    const weatherSulechow = await weatherServiceSulechow.get();
    await hangoutsChatService.sendMessage(new TextCard(`\n${dynamicTexts.TodaysWeather(weatherGrunberg.city)}`, thread), space);
    await hangoutsChatService.sendMessage(new TextCard(weatherGrunberg.interpretation(), thread), space);
    await hangoutsChatService.sendMessage(new TextCard(`\n${dynamicTexts.TodaysWeather(weatherGdynia.city)}`, thread), space);
    await hangoutsChatService.sendMessage(new TextCard(weatherGdynia.interpretation(), thread), space);
    await hangoutsChatService.sendMessage(new TextCard(`\n${dynamicTexts.TodaysWeatherCrapCity(weatherSulechow.city)}`, thread), space);
    await hangoutsChatService.sendMessage(new TextCard(weatherSulechow.interpretation(), thread), space);
  }
};
