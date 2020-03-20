import React, {useMemo} from 'react';
import './App.css';
import {Table} from "./components/Table";
import {getCountries} from "./lib/dataService";

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

  const data = React.useMemo(() => getCountries(), []);

  return (
    <Table columns={columns} data={data}/>
  );
}

export default App;
