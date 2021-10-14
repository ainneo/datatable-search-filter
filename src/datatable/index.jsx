import React from 'react';

export default function Datatable({ data }) {
  // console.log(data);//testing

  //get all the keys of object 0 and display them
  const columns = data[0] && Object.keys(data[0]);

  return (
    <table cellPadding={0} cellSpacing={0}>
      {/* mapping out table keys */}
      <thead>
        <tr>
          {data[0] && columns.map((heading) => <th>{heading}</th>)}
        </tr>
      </thead>
      {/* mapping out table values */}
      <tbody>
        {data.map((row) => (
          <tr>
            {columns.map((column) => (
              <td>{row[column]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
