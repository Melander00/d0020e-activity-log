import './App.css';
import CreateLogPage from './components/create/CreateLogPage';
import MainPage from './components/main/Main';
import Top from './components/top/Top';
import { CreateLogEntry } from './util/LogEntry';
import useLogs from './util/useLogs';

function App() {

    // const [entries, setEntries] = useState<LogEntry[]>([])

    const {data: entries, error, isLoading, mutate} = useLogs();

    const randomEntry = async () => {
        const activites: string[] = ["Learning", "Studying", "Running", "Walking", "Writing"]
        const results: string[] = ["Became smart", "Got information", "Grew stronger", "Relaxed", "yup"]
        const githubs: string[] = ["Yes", "No"]
        const log = await CreateLogEntry({
            activity: activites[Math.floor(Math.random() * activites.length)],
            time: Math.random(),
            results: results[Math.floor(Math.random() * results.length)],
            github: githubs[Math.floor(Math.random() * githubs.length)],
            index: Math.floor(Math.random() * 100000) + 1,
            week: Math.floor(Math.random() * (51-45) + 45)
        })
        mutate([...entries, log]);
        console.log(log)
    }
    
    return (
    <>
    <Top/>
        {/* <button onClick={randomEntry}>Add random entry <Icon>more_vert</Icon></button> */}
    <div className='container'>
        
        <MainPage/>
        <CreateLogPage/>
    </div>
    </>
    )
}

export default App
