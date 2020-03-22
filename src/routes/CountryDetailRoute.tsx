import React from 'react';
import { useParams } from 'react-router';
import { Country } from '../services/dataService';
import { CountryDetail } from '../components/CountryDetail';

type Props = {
    countries: Country[];
};

export function CountryDetailRoute({ countries }: Props) {
    const { id } = useParams();

    const selectedCountry = countries.find(country => country.id === id);

    return (
        <>
            {selectedCountry && (
                <>
                    <CountryDetail country={selectedCountry} />
                </>
            )}
        </>
    );
}
