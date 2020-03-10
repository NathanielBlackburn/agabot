const GiphyService = require('@services/giphy/giphyService');
const WeatherService = require('@services/openWeatherMap/openWeatherMapService');
const HangoutsChatService = require('@services/hangoutsChat/hangoutsChatService');
const CovidService = require('@services/covid/covidService');

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
    const covidService = new CovidService();
    const space = HangoutsChatService.Spaces.Pierdolety;
    console.log('dailyHelloResponder: Downloading random gif');
    const url = await giphyService.get(GiphyService.Queries.NewDayNewPossibilities);
    console.log(`dailyHelloResponder: Downloaded gif with url: ${url}`);
    console.log(`dailyHelloResponder: Downloading weather for Zielona Góra`);
    const weatherGrunberg = await weatherServiceGrunberg.get();
    console.log(`dailyHelloResponder: Downloading weather for Gdynia`);
    const weatherGdynia = await weatherServiceGdynia.get();
    console.log(`dailyHelloResponder: Downloading weather for Sulechów`);
    const weatherSulechow = await weatherServiceSulechow.get();
    console.log(`dailyHelloResponder: Downloading COVID-19 data`);
    const covidData = await covidService.getData();
    console.log(`dailyHelloResponder: Sending daily message to chat`);
    const threadData = await hangoutsChatService.sendMessage(new TextCard(staticTexts.NewDayNewPossibilities), space);
    console.log(`dailyHelloResponder: Received response from Hangouts Chat API:`);
    console.log(threadData);
    const thread = threadData.data.thread.name;
    console.log(`dailyHelloResponder: Sending the rest`);
    await hangoutsChatService.sendMessage(new ImageCard(url, false, thread), space);
    await hangoutsChatService.sendMessage(new TextCard(`\n${dynamicTexts.TodaysWeather(weatherGrunberg.city)}`, thread), space);
    await hangoutsChatService.sendMessage(new TextCard(weatherGrunberg.interpretation(), thread), space);
    await hangoutsChatService.sendMessage(new TextCard(`\n${dynamicTexts.TodaysWeather(weatherGdynia.city)}`, thread), space);
    await hangoutsChatService.sendMessage(new TextCard(weatherGdynia.interpretation(), thread), space);
    await hangoutsChatService.sendMessage(new TextCard(`\n${dynamicTexts.TodaysWeatherCrapCity(weatherSulechow.city)}`, thread), space);
    await hangoutsChatService.sendMessage(new TextCard(weatherSulechow.interpretation(), thread), space);
    if (covidData) {
      await hangoutsChatService.sendMessage(new TextCard(covidData.toString(), thread), space);
    }
  }

};
