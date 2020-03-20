import React from 'react';
import styles from './CountryDetail.module.scss';
import { Chart } from './Chart';
import { Country } from '../services/dataService';
import {Summary, SummaryItem} from "./Summary";

type Props = {
    country: Country;
};

export function CountryDetail({ country }: Props) {

    const getSummary = (country: Country): SummaryItem[] => {
        return [
            {label: 'Confirmed', value: String(country.totalVictims.confirmed)},
            {label: 'Recovered', value: String(country.totalVictims.recovered)},
            {label: 'Deaths', value: String(country.totalVictims.deaths)}
        ]
    };

    return (
        <div className={styles.detail}>
            <h1>{country.name}</h1>
            <Summary items={getSummary(country)} />
            <Chart data={country.dailyChanges} />
        </div>
    );
}
