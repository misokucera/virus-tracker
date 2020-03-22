import React, { useMemo } from 'react';
import styles from './CountryList.module.scss';
import { Table } from './Table';
import { Country } from '../services/dataService';
import { useHistory } from 'react-router';

type Props = {
    countries: Country[];
    selectedCountryId: string;
    onCountrySelect?: (country: Country) => void;
};

export function CountryList({ countries, selectedCountryId }: Props) {
    const columns = useMemo(
        () => [
            {
                header: 'Country',
                accessor: 'name'
            },
            {
                header: 'Total confirmed',
                accessor: 'totalVictims.confirmed'
            },
            {
                header: 'Total deaths',
                accessor: 'totalVictims.deaths'
            },
            {
                header: 'Total recovered',
                accessor: 'totalVictims.recovered'
            },
            {
                header: 'Last day confirmed',
                accessor: 'lastDayChange.confirmed'
            },
            {
                header: 'Last day deaths',
                accessor: 'lastDayChange.deaths'
            },
            {
                header: 'Last day recovered',
                accessor: 'lastDayChange.recovered'
            }
        ],
        []
    );

    const history = useHistory();
    const memoizedCountries = useMemo(() => countries, [countries]);

    const handleCountrySelection = (id: string) => {
        const country = countries.find(country => country.id === id);

        if (country) {
            history.push(`/${country.id}`);
        }
    };

    return (
        <div className={styles.list}>
            <Table
                columns={columns}
                data={memoizedCountries}
                selectedRowId={selectedCountryId}
                onRowSelected={handleCountrySelection}
            />
            <p>
                <i>Data source: <a href="https://github.com/pomber/covid19">https://github.com/pomber/covid19</a></i>
            </p>
        </div>
    );
}
