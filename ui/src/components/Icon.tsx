export default function Icon({icon, children}: {icon?: string, children?: string}) {
    return(
        <>
        <span className="material-symbols-outlined">{icon || children}</span>
        </>
    )
}