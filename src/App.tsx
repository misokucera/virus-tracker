import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {Table} from "./components/Table";
import {Country, getCountries} from "./services/dataService";
import {Chart} from "./components/Chart";

function App() {
  const columns = useMemo(() => [
    {
      header: 'Country',
      accessor: 'name',
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
    },
  ], []);

  const [data, setData] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>();

  useEffect(() => {
    getCountries().then(data => {
      setData(data);
    });
  }, []);

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  const handleCountrySelection = (id: string) => {
      const country = data[Number(id)];

      if (country) {
          setSelectedCountry(country);
      }
  };

  return (
      <>
        {selectedCountry && <Chart data={selectedCountry.dailyChanges}/>}
        {data.length && <Table columns={columns} data={memoizedData} onCountrySelect={handleCountrySelection}/>}
      </>
  );
}

export default App;
