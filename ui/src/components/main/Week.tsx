import { useMemo } from "react"
import { LogEntry } from "../../util/LogEntry"
import LogComponent from "./LogComponent"

type WeekProps = {
    logEntries: LogEntry[],
    weekNumber: number,
    beginningIds: number,
}

export default function Week({
    logEntries,
    weekNumber ,
    beginningIds   
}: WeekProps) {

    const entries = useMemo(() => {
        const logs = logEntries.sort((a, b) => a.index - b.index);
        return logs.map((entry, index) => <LogComponent key={entry.id} entry={entry} id={beginningIds + index} />)
    }, [logEntries])

    return(
        <>
        <div className="week">
            <h2>Week {weekNumber}</h2>
            <div className="logs">
                <div className="log">
                    <div className="log-entry">
                        <span className="log-id">ID:</span>
                        <span className="log-activity">Activity:</span>
                        <span className="log-time">Time:</span>
                        <span className="log-results">Results:</span>
                        <span className="log-github">Github:</span>
                    </div>
                    <div className="log-buttons">
                        <span className="log-options"></span>
                    </div>
                </div>
                {entries}
            </div>
        </div>
        </>
    )
}