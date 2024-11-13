import { useEffect, useState } from 'react'
import './App.css'
import { GetAllLogEntries, LogEntry } from './util/LogEntry'

function App() {

    const [entries, setEntries] = useState<LogEntry[]>([])

    useEffect(() => {

        async function get() {
            const logs = await GetAllLogEntries()
            setEntries(logs)
        }
        get();

    }, [])
    
    return (
    <>
    <div className='container'>
        <pre>{JSON.stringify(entries, null, 4)}</pre>
    </div>
    </>
    )
}

export default App
