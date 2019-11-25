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
      rating: 0,
      text: null
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
      rating: 0,
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
  if (rating == 0) {
    return 'nijak.';
  } else if (rating > 10) {
    return 'może być, jak nie w Polsce.';
  } else if (rating > 0) {
    return 'średnio w chuj.';
  } else if (rating < 0 && rating > -50) {
    return 'chujowo.';
  } else {
    return 'ja pierdolę, co wy tu jeszcze robicie?';
  }
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
    this.temperature = json.main.temp;
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
    let result = `Moja ogólna opinia: ${rating} Jeśli chodzi o temperaturę, to ${Math.floor(this.temperature)} ${degreesToDescription(this.temperature)}, ${temperature.text}.`;
    if (sunset.rating) {
      result += ` ${sunset.text}`;
    }
    if (cloudCover.rating) {
      result += ` ${cloudCover.text}`;
    }
    if (windSpeed.rating) {
      result += ` Na dodatek ${windSpeed.text}!`;
    }
    if (conditions.length) {
      if (conditions.length == 1) {
        result += ` A w ogóle to ${conditions.map(condition => condition.text).join(', ')}.`;
      } else {
        const lastCondition = conditions.pop();
        result += ` A w ogóle to ${conditions.map(condition => condition.text).join(', ')} i ${lastCondition.text}.`;
      }
    } else {
      result += ' Niewiele więcej mogę powiedzieć i chuj w to.';
    }
    result += ' Życzę miłego, cha cha, dnia - wasza pogodynka, Agabot. Kurwa.';

    return result;
  }

};
