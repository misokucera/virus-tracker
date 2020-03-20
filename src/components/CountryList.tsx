import React, {useMemo} from 'react';
import styles from './CountryList.module.scss';
import {Table} from "./Table";
import {Country} from "../services/dataService";

type Props = {
    countries: Country[],
    selectedCountryId: string,
    onCountrySelect?: (country: Country) => void
};

export function CountryList({countries, selectedCountryId, onCountrySelect}: Props) {
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

    const memoizedCountries = useMemo(() => countries, [countries]);

    const handleCountrySelection = (id: string) => {
        const country = countries.find(country => country.id === id);

        if (country && onCountrySelect) {
            onCountrySelect(country);
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
        </div>
    );
}