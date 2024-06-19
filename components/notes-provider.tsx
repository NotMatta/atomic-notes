"use client"

import NoteElement from "./note-components/note-element"
import { useState, useEffect } from "react"
import NoteButton from "./note-components/note-button"

const NotesProvider = () => {
    const Husk = {
        id: "0",
        Title: "Some Note",
        Text: "weird ahh text in a note",
        display: "minimized",
        status: "new"
    }


    const [render,setRender] = useState(true)
    const [activeNotes, setActiveNotes] = useState([Husk])

    useEffect(() => {
        if (render == true){
            setRender(false)
        }
    },[render,activeNotes])

    const Toggle = {
        minimize : (index:number) => {
            let newNotes = activeNotes
            newNotes[index].display = "minimized"
            setActiveNotes(newNotes)
            setRender(true)
        },
        normalize : (index:number) => {
            let newNotes = activeNotes
            newNotes.map((Note) => {
                if(Note.display != "minimized"){
                    Note.display = "minimized"
                }
            })
            newNotes[index].display = "normal"
            setActiveNotes(newNotes)
            setRender(true)
        },
        full : (index:number) => {
            let newNotes = activeNotes
            newNotes[index].display = "fullscreen"
            setActiveNotes(newNotes)
            setRender(true)
        },
        delete : (index:number) => {
            let newNotes = []
            activeNotes.map((Note,i) => {
                if (i != index){
                    newNotes.push(Note)
                }
            })
            setActiveNotes(newNotes)
            setRender(true)
        },
        add: () => {
            let newNotes = activeNotes
            newNotes.map((Note) => {
                if(Note.display != "minimized"){
                    Note.display = "minimized"
                }
            })
            newNotes.push({...Husk, display:"normal", Title:"", status:"new"})
            setActiveNotes(newNotes)
            setRender(true)
        },
        closeAll: () => {
            setActiveNotes([])
            setRender(true)
        }
    }

    return (
        <div className="absolute w-full h-full top-0">
            <div className="relative w-full max-w-full min-h-full max-h-full h-full overflow-y-scroll flex justify-center items-center gap-2 flex-wrap">
                {activeNotes.map((Note,key) => {
                    if (Note.display != "minimized"){
                        return <NoteElement key={key} Notes={activeNotes} setNotes={setActiveNotes} index={key} Toggle={Toggle}/>
                    }
                })}
                <div className="fixed bottom-2 right-2 w-full h-10 flex justify-end gap-2">
                    {activeNotes.map((Note,key) => {
                        if (Note.display == "minimized"){
                            return (<div key={key}
                                    className="border flex items-center bg-accent rounded-xl px-2 h-full aspect-[3/1] overflow-hidden hover:cursor-pointer"
                                    onClick={() => {Toggle.normalize(key)}}
                                    >
                                        <p>{Note.Title == "" ? "Empty Note" : Note.Title}</p>
                                        
                                    </div>)
                        }
                    })}
                <NoteButton Toggle={Toggle} isActive={activeNotes.length != 0}/>
                </div>
            </div>
        </div>
    )
}

export default NotesProvider
