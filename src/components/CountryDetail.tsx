import React from 'react';
import styles from './CountryDetail.module.scss';
import { Chart } from './Chart';
import { Country } from '../services/dataService';

type Props = {
    country: Country;
};

export function CountryDetail({ country }: Props) {
    return (
        <div className={styles.detail}>
            <h1>{country.name}</h1>
            <Chart data={country.dailyChanges} />
        </div>
    );
}
