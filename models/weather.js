const arrayToolkit = require('@tools/arrayToolkit');

const interpretTemperature = (temperature) => {
  let result;
  if (temperature > 27) {
    result = {
      rating: -20,
      text: 'nakurwia piekłem'
    };
  } else if (temperature > 18) {
    result = {
      rating: 20,
      text: 'może być'
    };
  } else if (temperature > 12) {
    result = {
      rating: 10,
      text: 'nie jest tragicznie zimno'
    };
  } else if (temperature > 6) {
    result = {
      rating: 5,
      text: 'bardzo zimno nie jest, ale załóżcie skarpety pod sandały'
    };
  } else if (temperature > 0) {
    result = {
      rating: -20,
      text: 'jest zimno jak w psiarni'
    };
  } else {
    result = {
      rating: -20,
      text: 'pizga złem jak w jebanym Czelabińsku'
    };
  }

  return result;
};

const interpretSunset = (sunset) => {
  let result;
  const currentTimestamp = (new Date()).valueOf() / 1000;
  if (sunset < currentTimestamp) {
    result = {
      rating: -10,
      text: 'Nic nie widać, bo już ciemno jak w dupie.'
    };
  } else if (sunset - currentTimestamp < 3600) {
    result = {
      rating: -5,
      text: 'Zaraz będzie ciemno i gówno będzie widać.'
    };
  } else {
    result = {
      rating: 0,
      text: null
    };
  }

  return result;
};

const interpretCloudCover = (cloudCover) => {
  let result;
  if (cloudCover > 50) {
    result = {
      rating: -10,
      text: 'Buro w chuj, bo wszędzie te zasrane chmury.'
    };
  } else if (cloudCover > 25) {
    result = {
      rating: -5,
      text: 'Jeśli chodzi o kolor nieba, to zwyczajowy - szary, jak wasze życie.'
    };
  } else {
    result = {
      rating: 20,
      text: 'Nawet coś słońce widać, gdybyście wyszli z tej jaskini rozpaczy.'
    };
  }

  return result;
};

const interpretWindSpeed = (windSpeed) => {
  let result;
  if (windSpeed > 10) {
    result = {
      rating: -10,
      text: 'wieje jak w Sulechowie'
    };
  } else if (windSpeed > 20) {
    result = {
      rating: -20,
      text: 'jest jebany huragan'
    };
  } else {
    result = {
      rating: 10,
      text: null
    };
  }

  return result;
};

const interpretConditions = (conditions) => {
  return arrayToolkit.dedupe(conditions.map(conditionId => {
    switch (true) {
      case (conditionId >= 200 && conditionId < 300):
        return {
          rating: -20, text: 'jest jakaś jebana burza'
        };
        break;
      case (conditionId == 751 || conditionId == 731 || conditionId == 761):
        return {
          rating: -10, text: 'jeszcze jakimś pyłem sypie'
        };
        break;
      case ((conditionId >= 300 && conditionId < 400) || conditionId == 500):
        return {
          rating: -5, text: 'jest mokro'
        };
        break;
      case (conditionId == 701 || conditionId == 741):
        return {
          rating: -5, text: 'jest jakaś, kurwa, mgła'
        };
        break;
      case (conditionId > 500 && conditionId < 600):
        return {
          rating: -10, text: 'napierdala deszczem'
        };
        break;
      case (conditionId >= 600 && conditionId < 700):
        return {
          rating: -10, text: 'pada z nieba to białe gówno'
        };
        break;
      case (conditionId == 762):
        return {
          rating: -100, text: 'WYBUCHŁ KURWA WULKAN!!!!!!11one'
        };
        break;
      case (conditionId == 781):
        return {
          rating: -100, text: 'RATUNKU KURWA TORNADO JAPIERDOLE'
        };
        break;
      default:
        return {
          rating: 0, text: null
        };
    }
  }).filter(condition => condition.rating));
};

const interpretRating = (interpretations) => {
  const rating = interpretations.reduce((acc, value) => acc + value.rating, 0);
  let text;
  if (rating == 0) {
    text = 'nijak.';
  } else if (rating > 10) {
    text = 'może być, jak nie w Polsce.';
  } else if (rating > 0) {
    text =  'średnio w chuj.';
  } else if (rating < 0 && rating > -50) {
    text =  'chujowo.';
  } else {
    text =  'ja pierdolę, co wy tu jeszcze robicie?';
  }

  return {numeric: rating, textual: text};
};

const degreesToDescription = (degrees) => {
  degrees = Math.abs(degrees);
  const lastDigit = degrees % 10;
  const tenths = degrees % 100;
  if (degrees == 1) {
    return 'stopień';
  } else if (lastDigit > 1 && lastDigit < 5 && (tenths < 10 || tenths > 20)) {
    return 'stopnie';
  } else {
    return 'stopni';
  }
};

module.exports = class Weather {

  constructor(json) {
    console.log(json);
    this.temperature = Math.floor(json.main.temp);
    this.cloudCover = json.clouds.all;
    this.sunrise = json.sys.sunrise;
    this.sunset = json.sys.sunset;
    this.windSpeed = json.wind.speed;
    this.conditions = json.weather.map(conditions => conditions.id);
  }

  toString() {
    const temperature = interpretTemperature(this.temperature);
    const sunset = interpretSunset(this.sunset);
    const cloudCover = interpretCloudCover(this.cloudCover);
    const windSpeed = interpretWindSpeed(this.windSpeed);
    const conditions = interpretConditions(this.conditions);
    const rating = interpretRating([temperature, sunset, cloudCover, windSpeed].concat(conditions));
    let result = `Moja ogólna opinia: ${rating.textual} Jeśli chodzi o temperaturę, to ${this.temperature} ${degreesToDescription(this.temperature)}, ${temperature.text}.`;
    if (sunset.text) {
      result += ` ${sunset.text}`;
    }
    if (cloudCover.text) {
      result += ` ${cloudCover.text}`;
    }
    if (windSpeed.text) {
      result += ` Na dodatek ${windSpeed.text}!`;
    }
    if (conditions.length) {
      if (conditions.length == 1) {
        result += ` A w ogóle to ${conditions[0].text}.`;
      } else {
        const lastCondition = conditions.pop();
        result += ` A w ogóle to ${conditions.map(condition => condition.text).join(', ')} i ${lastCondition.text}.`;
      }
    } else {
      if (rating.numeric > 10) { // FIXME: Repeated code from interpretRating
        result += ' Niewiele więcej mogę powiedzieć, może to i dobrze.';
      } else {
        result += ' Niewiele więcej mogę powiedzieć i chuj w to.';
      }
    }
    // TODO: All of this calls for a weather forecaster's mood. If the rating's good, all of the texts
    // should be a bit more cheery.
    if (rating.numeric > 10) {
      result += ' Miłego dnia (chyba). Wasza pogodynka, Agabot, lic. meteorologii i klimatologii, prof. UZ, filia w Sulechowie.';
    } else {
      result += ' Życzę miłego, cha cha, dnia - wasza pogodynka, Agabot. Kurwa.';
    }

    return result;
  }

};
