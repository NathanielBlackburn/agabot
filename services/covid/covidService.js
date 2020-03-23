const promisifyHttp = require('@tools/promisifyHttp');
const https = promisifyHttp(require('https'));
const csvParse = require('csv-parse/lib/sync');
const dateFns = require('date-fns');

module.exports = class CovidService {

    async getData() {
        const date = dateFns.format(dateFns.subDays(new Date(), 1), 'MM-dd-yyyy');
        try {
            const csvData = await https.request(
                `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${date}.csv`,
                {
                    headers: {
                        'Accept': 'text/plain'
                    }
                }
            );
            const covidData = csvParse(csvData);
            const modeledData = covidData
                .slice(1)
                .map((value) => {
                    return {
                        name: value[1],
                        confirmed: parseInt(value[3]) || 0,
                        deaths: parseInt(value[4]) || 0,
                        recovered: parseInt(value[5]) || 0
                    };
                });
            const aggregatedCountryData = modeledData
                .reduce((acc, value) => {
                    const existingCountryIndex = acc.findIndex(country => {
                        return country.name == value.name;
                    });
                    if (existingCountryIndex != -1) {
                        acc[existingCountryIndex].confirmed += value.confirmed;
                        acc[existingCountryIndex].deaths += value.deaths;
                        acc[existingCountryIndex].recovered += value.recovered;
                    } else {
                        acc.push(value);
                    }
                    return acc;
                }, []);
            const aggregatedData = aggregatedCountryData
                .reduce((acc, value) => {
                    acc.confirmed += value.confirmed;
                    acc.deaths += value.deaths;
                    acc.recovered += value.recovered;
                    return acc;
                }, {
                    confirmed: 0,
                    deaths: 0,
                    recovered: 0
                });
            const sortedByConfirmed = aggregatedCountryData.sort((a, b) => {
                return b.confirmed - a.confirmed;
            });
            const sortedByDeaths = sortedByConfirmed.slice().sort((a, b) => {
                return b.deaths - a.deaths;
            });
            const leader = sortedByConfirmed[0];
            const polandIndex = aggregatedCountryData.findIndex(country => country.name == 'Poland');
            const polandConfirmed = aggregatedCountryData[polandIndex].confirmed;
            return `
Stan COVID-19 na dziś:
    chorych: *${Number(aggregatedData.confirmed).toLocaleString('pl-PL')}*
    martwych: *${Number(aggregatedData.deaths).toLocaleString('pl-PL')}*
    cudownie ozdrowiałych: *${Number(aggregatedData.recovered).toLocaleString('pl-PL')}*

Polska zajmuje ${polandIndex} miejsce z liczbą ${Number(polandConfirmed).toLocaleString('pl-PL')} chorych.

*30 Zgon, lista, lista, lista umarlaków:*
    1. ${sortedByDeaths[0].name}: ${Number(sortedByDeaths[0].deaths).toLocaleString('pl-PL')}
    2. ${sortedByDeaths[1].name}: ${Number(sortedByDeaths[1].deaths).toLocaleString('pl-PL')}
    3. ${sortedByDeaths[2].name}: ${Number(sortedByDeaths[2].deaths).toLocaleString('pl-PL')}
    4. ${sortedByDeaths[3].name}: ${Number(sortedByDeaths[3].deaths).toLocaleString('pl-PL')}
    5. ${sortedByDeaths[4].name}: ${Number(sortedByDeaths[4].deaths).toLocaleString('pl-PL')}`;
        } catch (error) {
            return null;
        }
    }

};
