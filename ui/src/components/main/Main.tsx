import { useMemo } from "react";
import { LogEntry } from "../../util/LogEntry";
import useLogs from "../../util/useLogs";
import Week from "./Week";

export default function MainPage() {
    const {data} = useLogs();
    
    const groupEntries = useMemo(() => {
        const weeks: {[key: number]: LogEntry[]} = {}
        data.forEach((entry) => {
            if(weeks[entry.week]) {
                weeks[entry.week].push(entry)
            } else {
                weeks[entry.week] = [entry]
            }
        }) 

        const arr: React.ReactNode[] = []
        let ids = 1;
        for(const [week, entries] of Object.entries(weeks)) {
            arr.push(<Week key={week} weekNumber={parseInt(week)} logEntries={entries} beginningIds={ids} />)
            ids += entries.length;
        } 
        return arr
    }, [data])

    return(
        <>
        <main className="main">
            
            {groupEntries}
        </main>
        </>
    )
}