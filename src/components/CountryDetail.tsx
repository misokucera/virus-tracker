import React from 'react';
import styles from './CountryDetail.module.scss';
import { Chart } from './Chart';
import { Country } from '../services/dataService';
import { Summary, SummaryItem } from './Summary';
import {MdClose} from "react-icons/md";
import {useHistory} from "react-router";

type Props = {
    country: Country;
};

export function CountryDetail({ country }: Props) {
    const history = useHistory();
    const getSummary = (country: Country): SummaryItem[] => {
        return [
            {
                label: 'Confirmed',
                value: String(country.totalVictims.confirmed)
            },
            {
                label: 'Recovered',
                value: String(country.totalVictims.recovered)
            },
            { label: 'Deaths', value: String(country.totalVictims.deaths) }
        ];
    };

    const handleCloseDetail = () => {
        history.push('/');
    };

    return (
        <div className={styles.detail}>
            <div className={styles.header}>
                <h1>{country.name}</h1>
                <button
                    className={styles.close}
                    onClick={handleCloseDetail}
                >
                    <MdClose />
                </button>
            </div>
            <Summary items={getSummary(country)} />
            <Chart dailyChanges={country.dailyChanges} />
        </div>
    );
}
