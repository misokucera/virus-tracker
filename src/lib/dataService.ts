import data from '../tests/data/timeseries.json';

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

export const getCountries = () => {
    const countries: Country[] = [];

    for (let [name, dailyChanges] of Object.entries(data)) {
        const last = dailyChanges[dailyChanges.length - 1];

        countries.push({
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
