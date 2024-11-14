import { useState } from "react"
import { LogEntry } from "../../util/LogEntry"
import Icon from "../Icon"
import LogSettingsModal from "./LogSettingsModal"

type LogProps = {
    entry: LogEntry,
    id: number,
}
export default function LogComponent({
    entry,
    id
}: LogProps) {

    const [modalOpen, setModalOpen] = useState(false)

    return(
        <>
        <div className="log" style={{
            background: id%2 == 0 ? "var(--even)" : "var(--odd)"
        }}>

        <div className="log-entry">
            <span className="log-id">{id}</span>
            <span className="log-activity">{entry.activity}</span>
            <span className="log-time">{Math.floor(entry.time * 10) / 10} h</span>
            <span className="log-results">{entry.results}</span>
            <span className="log-github">{entry.github}</span>
        </div>

        <div className="log-buttons">
            <span onClick={() => setModalOpen(f => !f)} className="log-options"><Icon>more_vert</Icon></span>
            <LogSettingsModal entry={entry} id={id} className="dialog" isOpen={modalOpen} closeModal={() => setModalOpen(false)} />
        </div>

        </div>
        </>
    )
}