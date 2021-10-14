import React, { useState, useEffect } from 'react';

import Datatable from '../datatable';
import './styles.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default function App() {

  //state
  const [data, setData] = useState([]);//copy of stored data state
  const [q, setQ] = useState('');//search bar input value state
  const [searchColumns, setSearchColumns] = useState([
    'name',
    'birth_year',
  ]); //checkbox values - initail state is set

  // api data fetch
  useEffect(() => {
    fetch('https://swapi.dev/api/people')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []); //only gets called once

  //search function, row = data
  //filters through data state and returns filtered data results based on search input value and checkbox values
  //search function passes in the data and filters through each item in the array, and returns the filtered results
  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }

  //init column checkbox state
  //console.log(data) //[{}, {}, {}]
  //get all of the data object keys
  //since all objects have the same keys, we can use the first object to get the keys
  const columns = data[0] && Object.keys(data[0]);

  return (
    <div>
      <div>
        {/* search box */}
        <input
          type='text'
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        {/* checkbox */}
        {columns &&
          columns.map((column) => (
            <label>
              <input
                type='checkbox'
                checked={searchColumns.includes(column)}
                onChange={(e) => {
                  const checked = searchColumns.includes(column);
                  setSearchColumns((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== column)
                      : [...prev, column],
                  );
                }}
              />
              {column}
            </label>
          ))}
      </div>
      <div>
        <Datatable data={search(data)} />
          {/* passing in data state into datatable */}
          {/* search function is automatically invoked on every render and passes in the initial data state */}
          {/* search updates based on the checked and value inputs*/}
      </div>
    </div>
  );
}

