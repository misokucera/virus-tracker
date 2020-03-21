import data from '../tests/data/timeseries.json';
import slugify from 'slugify';

type VictimStats = {
    confirmed: number;
    deaths: number;
    recovered: number;
};

export type DailyChange = {
    date: string;
    confirmed: number;
    deaths: number;
    recovered: number;
};

export type Country = {
    id: string;
    name: string;
    dailyChanges: DailyChange[];
    totalVictims: VictimStats;
    lastDayChange: VictimStats;
};

const defaultVictimStats: VictimStats = {
    confirmed: 0,
    deaths: 0,
    recovered: 0
};

const API_URL = 'https://pomber.github.io/covid19/timeseries.json';

export const getCountries = async () => {
    if (process.env.NODE_ENV === 'production') {
        const response = await fetch(API_URL);
        const data = await response.json();

        return mapDataFromSource(data);
    }

    return mapDataFromSource(data);
};

const mapDataFromSource = (data: { [key: string]: any[] }): Country[] => {
    const countries: Country[] = [];

    for (let [name, dailyChanges] of Object.entries(data)) {
        const last = dailyChanges[dailyChanges.length - 1];

        countries.push({
            id: slugify(name, {lower: true}),
            name: name,
            dailyChanges: dailyChanges,
            totalVictims: {
                confirmed: last.confirmed,
                deaths: last.deaths,
                recovered: last.recovered
            },
            lastDayChange: getLastDayIncrease(dailyChanges)
        });
    }

    return countries;
};

const getLastDayIncrease = (dailyChanges: DailyChange[]): VictimStats => {
    if (dailyChanges.length === 0) {
        return defaultVictimStats;
    }

    const last = dailyChanges[dailyChanges.length - 1];

    if (dailyChanges.length === 1) {
        return last;
    }

    const dayBeforeLast = dailyChanges[dailyChanges.length - 2];

    return {
        confirmed: last.confirmed - dayBeforeLast.confirmed,
        deaths: last.deaths - dayBeforeLast.deaths,
        recovered: last.recovered - dayBeforeLast.recovered
    };
};
