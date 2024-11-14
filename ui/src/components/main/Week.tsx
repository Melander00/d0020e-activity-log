import { useMemo } from "react"
import { LogEntry } from "../../util/LogEntry"
import LogComponent from "./LogComponent"

type WeekProps = {
    logEntries: LogEntry[],
    weekNumber: number
}

export default function Week({
    logEntries,
    weekNumber    
}: WeekProps) {

    const entries = useMemo(() => {
        return logEntries.sort((a, b) => a.index - b.index).map((entry) => <LogComponent key={entry.id} entry={entry} />)
    }, [logEntries])

    return(
        <>
        <div className="week">
            <h2>Week {weekNumber}</h2>
            <div className="log-entry">
                <span className="log-id">ID:</span>
                <span className="log-activity">Activity:</span>
                <span className="log-time">Time:</span>
                <span className="log-results">Results:</span>
                <span className="log-github">Github:</span>
                <span className="log-handle"></span>
            </div>
            {entries}
        </div>
        </>
    )
}