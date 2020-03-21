import React, { useEffect, useState } from 'react';
import { Country, getCountries } from './services/dataService';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CountryDetailRoute } from './routes/CountryDetailRoute';
import { CountryListRoute } from './routes/CountryListRoute';

function App() {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        getCountries().then(countries => {
            setCountries(countries);
        });
    }, []);

    return (
        <>
            <Router>
                <div className={styles.layout}>
                    <Route path="/:id?">
                        <CountryListRoute countries={countries} />
                    </Route>
                    <Route path="/:id">
                        <CountryDetailRoute countries={countries} />
                    </Route>
                </div>
            </Router>
        </>
    );
}

export default App;
