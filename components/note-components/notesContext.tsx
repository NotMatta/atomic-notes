import { createContext } from "react"

const NotesContext = createContext({
    activeNotes: [],
    setActiveNotes: () => {}
})
export default NotesContext
