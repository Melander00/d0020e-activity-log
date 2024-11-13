import useSWR from "swr";
import { GetAllLogEntries, LogEntry, LogsEndpoint } from "./LogEntry";

export default function useLogs() {
    const {data, error, isLoading, mutate} = useSWR<LogEntry[]>(LogsEndpoint(), GetAllLogEntries, {fallbackData: []})

    const obj = {
        data: data || [],
        error,
        isLoading,
        mutate
    }

    return obj;
}