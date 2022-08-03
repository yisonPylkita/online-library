import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Table from './Table'
import axios from 'axios'
import React from 'react'


function App() {
  const [count, setCount] = useState(0)

  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "TV Show",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "show.name"
          },
          {
            Header: "Type",
            accessor: "show.type"
          }
        ]
      },
      {
        // Second group - Details
        Header: "Details",
        // Second group columns
        columns: [
          {
            Header: "Language",
            accessor: "show.language"
          },
          {
            Header: "Genre(s)",
            accessor: "show.genres"
          },
          {
            Header: "Runtime",
            accessor: "show.runtime"
          },
          {
            Header: "Status",
            accessor: "show.status"
          }
        ]
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  function useInput(opts: any) {
    const [value, setValue] = React.useState('');
    const input = <input
      value={value}
      onChange={e => setValue(e.target.value)}
      {...opts} />

    return [value, input];
  }

  const [username, usernameInput] = useInput({ placeholder: 'Type to search for specific phrase' });

  useEffect(() => {
    (async () => {
      const result = await axios(`https://api.tvmaze.com/search/shows?q=${username}`);
      setData(result.data);
    })();
  }, [username]);


  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 10)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {usernameInput}
      <Table columns={columns} data={data} />
    </div>
  )
}

export default App
