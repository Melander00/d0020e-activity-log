import { LogEntry } from "../../util/LogEntry"

type WeekProps = {
    logEntries: LogEntry[],
    weekNumber: number
}

export default function Week({
    logEntries,
    weekNumber    
}: WeekProps) {
    return(
        <>
        <div className="week">
            <h2>Week {weekNumber}</h2>
            <pre>{JSON.stringify(logEntries, null, 4)}</pre>

        </div>
        </>
    )
}