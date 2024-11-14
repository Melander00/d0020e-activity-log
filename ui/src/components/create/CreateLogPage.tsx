import { useState } from "react";
import { GetWeek } from "../../util/Date";
import { CreateLogEntry } from "../../util/LogEntry";
import useLogs from "../../util/useLogs";

export default function CreateLogPage() {
    const {data, mutate} = useLogs()
    
    const [activity, setActivity] = useState("")
    const [time, setTime] = useState(0)
    const [week, setWeek] = useState(GetWeek(new Date()))
    const [results, setResults] = useState("")
    const [github, setGithub] = useState("")

    const [disabled, setDisabled] = useState(false)

    const submit = async () => {
        setDisabled(true)
        const arr = [...data];
        const log = {
            activity,
            time,
            week,
            results,
            github,
            index: data.length,
            id: -1
        }
        mutate([...arr, log])
        try {
            const resLog = await CreateLogEntry({
                activity,
                time,
                week,
                results,
                github,
                index: data.length,
            })
            mutate([...arr, resLog])
            setActivity("")
            setTime(0)
            setWeek(GetWeek(new Date()))
            setResults("")
            setGithub("")
        } catch (error) {
            mutate(arr)
            alert(error)
        } 
        setTimeout(() => {
            setDisabled(false)
        }, 200)
    }

    return(
        <>
        <div className="create">
            <h1>Create new entry</h1>
            <label>
                <span>Activity:</span>
                <textarea value={activity} onChange={e => setActivity(e.target.value)} />
            </label>

            <label>
                <span>Week:</span>
                <input type="number" min={0} max={99} value={week} onChange={e => setWeek(e.target.valueAsNumber)}  />
            </label>

            <label>
                <span>Time:</span>
                <input type="number" min={0} max={99} value={time} onChange={e => setTime(e.target.valueAsNumber)} />
            </label>

            <label>
                <span>Results:</span>
                <textarea value={results} onChange={e => setResults(e.target.value)} />
            </label>

            <label>
                <span>Github:</span>
                <textarea value={github} onChange={e => setGithub(e.target.value)} />
            </label>

            <button onClick={submit} disabled={disabled}>Create</button>
        </div>
        </>
    )
}