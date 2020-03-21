import React, { useEffect, useState } from 'react';
import { Country, getCountries } from './services/dataService';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CountryDetailRoute } from './routes/CountryDetailRoute';
import { CountryListRoute } from './routes/CountryListRoute';
import { useMediaQuery } from 'react-responsive';

function App() {
    const [countries, setCountries] = useState<Country[]>([]);
    const isMobile = useMediaQuery({ query: '(max-width: 900)' });

    useEffect(() => {
        getCountries().then(countries => {
            setCountries(countries);
        });
    }, []);

    return (
        <>
            <Router>
                <div className={styles.layout}>
                    {isMobile ? (
                        <>
                            <div className={styles.main}>
                                <Switch>
                                    <Route path="/:id">
                                        <CountryDetailRoute
                                            countries={countries}
                                        />
                                    </Route>
                                    <Route path="/">
                                        <CountryListRoute
                                            countries={countries}
                                        />
                                    </Route>
                                </Switch>
                            </div>
                        </>
                    ) : (
                        <>
                            <Route path="/:id?">
                                <div className={styles.main}>
                                    <CountryListRoute countries={countries} />
                                </div>
                            </Route>
                            <Route path="/:id">
                                <div className={styles.side}>
                                    <CountryDetailRoute countries={countries} />
                                </div>
                            </Route>
                        </>
                    )}
                </div>
            </Router>
        </>
    );
}

export default App;
