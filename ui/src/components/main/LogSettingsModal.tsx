import { useEffect, useRef, useState } from "react"
import { DeleteLogEntry, LogEntry, UpdateLogEntry } from "../../util/LogEntry"
import useLogs from "../../util/useLogs"
import Icon from "../Icon"

type LogSettingsModalProps = {
    isOpen: boolean,
    closeModal: () => void,
    children?: React.ReactNode,
    className?: string,
    entry: LogEntry,
    id: number,
}

const UNDO_VISIBLE_TIME = 10000;
const UNDO_ANIMATION_TIME = 500;

export default function LogSettingsModal({
    isOpen, closeModal, className, entry, id
}: LogSettingsModalProps) {

    const {data, mutate} = useLogs();
    
    const modal = useRef<HTMLDialogElement>(null)

    const [activity, setActivity] = useState(entry.activity)
    const [time, setTime] = useState(entry.time)
    const [week, setWeek] = useState(entry.week)
    const [results, setResults] = useState(entry.results)
    const [github, setGithub] = useState(entry.github)

    const [undoVisible, setUndoVisible] = useState(false)
    const [undoHidden, setUndoHidden] = useState(true)
    
    const [buttonsDisabled, setButtonsDisabled] = useState(false)
    
    const [delId, setDelId] = useState(-1)
    const [visibleId, setVisibleId] = useState(-1)

    useEffect(() => {
        if(isOpen) {
            modal.current?.showModal()
        } else {
            modal.current?.close()
        }
    }, [modal, isOpen])

    const save = async () => {
        setButtonsDisabled(true)
        await UpdateLogEntry({
            ...entry,
            activity,
            time,
            week,
            results,
            github
        })
        mutate()
        setButtonsDisabled(false)
        closeModal()
    }

    const delEntry = async () => {
        await DeleteLogEntry(entry.id)
        mutate(data.filter(e => e.id !== entry.id), {revalidate: true})

        // should not have to be run due to the component being unmounted(?)
        setUndoHidden(true)
    }

    const del = () => {
        setUndoHidden(false)
        setTimeout(() => {
            setUndoVisible(true)
        }, 1)
        // setUndoVisible(true)
        const dId = setTimeout(delEntry, UNDO_VISIBLE_TIME)
        setDelId(dId)

        const vId = setTimeout(() => {
            setUndoVisible(false)
        }, UNDO_VISIBLE_TIME - UNDO_ANIMATION_TIME)
        setVisibleId(vId)
        
        closeModal()
    }

    const undo = () => {
        clearTimeout(delId)
        clearTimeout(visibleId)

        setUndoVisible(false)
        setTimeout(() => {
            setUndoHidden(true)
        }, UNDO_ANIMATION_TIME)
        // CreateLogEntry(entry)
        mutate()
    }

    const delAnyway = () => {
        clearTimeout(delId)
        clearTimeout(visibleId)
        
        setUndoVisible(false)
        setTimeout(delEntry, UNDO_ANIMATION_TIME)
    }

    return(
        <>
        <dialog ref={modal} onCancel={closeModal} className={className}>
            <div className="modal">
                <span autoFocus className="close-modal" onClick={closeModal}><Icon>close</Icon></span>

                <div className="modal-content">
                    <h3>Edit entry</h3>
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
                </div>

                <div className="modal-button">
                    <button disabled={buttonsDisabled} onClick={closeModal}>Cancel</button>
                    <button disabled={buttonsDisabled} onClick={del}>Delete</button>
                    <button disabled={buttonsDisabled} onClick={save}>Save</button>
                </div>
            </div>
        </dialog>
        <div hidden={undoHidden} style={{
            opacity: undoVisible ? 1 : 0
        }} className="undo-information">
            <span onClick={delAnyway} className="undo-close"><Icon>close</Icon></span>
            <span>Log entry with id: <b>{id}</b> is being removed. <span onClick={undo} className="undo-button">Click here to undo</span></span>
        </div>
        </>
    )
}