export type LogEntry = {
    id: number,
    activity: string,
    time: number,
    results: string,
    github: string,
    index: number,
    week: number,
}

export type LogEntryNoId = Omit<LogEntry, "id">

export const Endpoint = (path: string) => import.meta.env.DEV ? `/api${path}` : `${path}`

export function LogsEndpoint() {return Endpoint("/logs")}

export async function GetAllLogEntries() {
    const res = await fetch(Endpoint("/logs"))
    const json = await res.json();
    return json as LogEntry[];
}

export async function CreateLogEntry(entry: LogEntryNoId) {
    const res = await fetch(Endpoint("/create"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    const json = await res.json();
    return json as LogEntry
}

export async function UpdateLogEntry(entry: LogEntry) {
    const res = await fetch(Endpoint("/update"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
    const json = await res.json();
    return json as LogEntry
}

export async function ChangeOrderOfEntries(map: {[key: number]: number}) {
    return await fetch(Endpoint("/set_order"), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(map)
    })
}

export async function DeleteLogEntry(id: number) {
    return await fetch(Endpoint(`/delete/${id}`), {
        method: "DELETE",
    })
}