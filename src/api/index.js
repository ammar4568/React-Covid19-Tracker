import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log('error', error);
    }
}


const dailyUrl = 'https://api.covidtracking.com/v1/us/daily.json';

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(dailyUrl);

        const modifiedData = data.reverse().map(dailyData => ({
            confirmed: dailyData.positive,
            recovered: dailyData.recovered,
            deaths: dailyData.death,
            date: dailyData.dateChecked,
        }))

        return modifiedData;
    } catch (error) {
        console.log('error', error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)

        return countries.map(country => country.name);
    } catch (error) {
        console.log(error)
    }
}