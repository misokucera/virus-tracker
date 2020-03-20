import React, { useEffect, useState } from 'react';
import { Country, getCountries } from './services/dataService';
import styles from './App.module.scss';
import { CountryDetail } from './components/CountryDetail';
import { CountryList } from './components/CountryList';
import { MdClose } from 'react-icons/md';

function App() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(
        null
    );

    useEffect(() => {
        getCountries().then(countries => {
            setCountries(countries);
        });
    }, []);

    const handleCountrySelection = (country: Country) => {
        if (country) {
            setSelectedCountry(country);
        }
    };

    const handleCloseDetail = () => {
        setSelectedCountry(null);
    };

    return (
        <div className={styles.layout}>
            {countries.length && (
                <div className={styles.main}>
                    <CountryList
                        countries={countries}
                        selectedCountryId={selectedCountry ? selectedCountry.id : ''}
                        onCountrySelect={handleCountrySelection}
                    />
                </div>
            )}
            {selectedCountry && (
                <div className={styles.side}>
                    <button
                        className={styles.close}
                        onClick={handleCloseDetail}
                    >
                        <MdClose />
                    </button>
                    <CountryDetail country={selectedCountry} />
                </div>
            )}
        </div>
    );
}

export default App;
