import React, { useEffect } from 'react';
import styles from '../App.module.scss';
import { CountryList } from '../components/CountryList';
import { Country } from '../services/dataService';
import { useParams } from 'react-router';

type Props = {
    countries: Country[];
};

export function CountryListRoute({ countries }: Props) {
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
    }, [id]);

    return (
        <>
            {countries.length > 0 && (
                <>
                    <CountryList
                        countries={countries}
                        selectedCountryId={id || ''}
                    />
                </>
            )}
        </>
    );
}
