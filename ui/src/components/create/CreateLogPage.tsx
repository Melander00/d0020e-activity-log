import { useState } from "react";
import { CreateLogEntry } from "../../util/LogEntry";
import useLogs from "../../util/useLogs";

export default function CreateLogPage() {
    const {data, mutate} = useLogs()
    
    const [activity, setActivity] = useState("")
    const [time, setTime] = useState(0)
    const [week, setWeek] = useState(0)
    const [results, setResults] = useState("")
    const [github, setGithub] = useState("")

    const submit = async () => {
        const log = {
            activity,
            time,
            week,
            results,
            github,
            index: data.length,
            id: -1
        }
        mutate([...data, log])
        const logServer = await CreateLogEntry({
            activity,
            time,
            week,
            results,
            github,
            index: data.length,
        })
        mutate()
    }

    return(
        <>
        <div className="create">
            <h1>Create new entry</h1>
            <label>
                <span>Activity:</span>
                <textarea />
            </label>

            <label>
                <span>Week:</span>
                <input type="number" min={0} max={99} />
            </label>

            <label>
                <span>Time:</span>
                <input type="number" min={0} max={99} />
            </label>

            <label>
                <span>Results:</span>
                <textarea />
            </label>

            <label>
                <span>Github:</span>
                <textarea />
            </label>

            <button onClick={submit}>Create</button>
        </div>
        </>
    )
}