import { LogEntry } from "../../util/LogEntry"
import Icon from "../Icon"

type LogProps = {
    entry: LogEntry
}
export default function LogComponent({
    entry
}: LogProps) {
    return(
        <>
        <div className="log-entry">
            <span className="log-id">{entry.id}</span>
            <span className="log-activity">{entry.activity}</span>
            <span className="log-time">{Math.floor(entry.time * 10) / 10} h</span>
            <span className="log-results">{entry.results}</span>
            <span className="log-github">{entry.github}</span>
            <span className="log-handle"><Icon>drag_handle</Icon></span>
        </div>
        </>
    )
}