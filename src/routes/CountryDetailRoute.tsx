import React from 'react';
import { useHistory, useParams } from 'react-router';
import { Country } from '../services/dataService';
import styles from '../App.module.scss';
import { MdClose } from 'react-icons/md';
import { CountryDetail } from '../components/CountryDetail';

type Props = {
    countries: Country[];
};

export function CountryDetailRoute({ countries }: Props) {
    const { id } = useParams();
    const history = useHistory();

    const selectedCountry = countries.find(country => country.id === id);

    const handleCloseDetail = () => {
        history.push('/');
    };

    return (
        <>
            {selectedCountry && (
                <>
                    <button
                        className={styles.close}
                        onClick={handleCloseDetail}
                    >
                        <MdClose />
                    </button>
                    <CountryDetail country={selectedCountry} />
                </>
            )}
        </>
    );
}
