import { useState } from "react";

const useNotes = () => {
    const Husk = {
        id: -1,
        noteTitle: "Some Note",
        noteText: "weird ahh text in a note",
        tagIndex: 0,
        display: "minimized",
        status: "new"
    }
    const [activeNotes,changeActiveNotes] = useState([Husk])
    const setActiveNotes = (newValue:any) => {
        changeActiveNotes(newValue)
    }

    return {activeNotes,setActiveNotes}
}
export default useNotes
