"use client"

import NoteElement from "./note-components/note-element"
import { useState, useEffect, useContext } from "react"
import NoteButton from "./note-components/note-button"
import axios from "axios"
import NotesContext from "./note-components/notesContext"
import RenderContext from "./note-components/renderContext"
import { useRouter } from "next/navigation"

const NotesProvider = ({vaultSession} : any) => {

    const router = useRouter()

    const Husk = {
        noteTitle: "Some Note",
        noteText: "weird ahh text in a note",
        tagIndex: 0,
        display: "minimized",
        status: "new"
    }
    

    const {render,setRender} = useContext(RenderContext)
    const {activeNotes, setActiveNotes} : any = useContext(NotesContext)
    const [isEditing, setEditing] = useState(false)
    const [vaultTags,setVaultTags] : any = useState([])
    const [isFull, setFull] = useState(false)

    useEffect(() => {
        if (render == true){
            let i = 0
            let j = false
            activeNotes.map((note) => {
                note.display == "fullscreen" ? j=true : j = j
                note.display == "minimized" ? i++ : i = i
            })
            setFull(j)
            setEditing(i != activeNotes.length)
            setRender(false)
        }
        if(vaultSession.status == "authenticated"){
            setVaultTags(vaultSession.vaultTags)
        }
    },[render,activeNotes,setRender,vaultSession])
    
    const HandleSave = async () => {
        const token = vaultSession.token
        let notesToCreate : any = []
        let notesToUpdate : any = []

        activeNotes.map((note) => {
            note.status == "new"? notesToCreate.push({
                noteTitle: note.noteTitle,
                noteText: note.noteText,
                tagId: vaultTags[note.tagIndex].id
            }):
                notesToUpdate.push({
                noteId: note.id,
                noteTitle: note.noteTitle,
                noteText: note.noteText,
                tagId: vaultTags[note.tagIndex].id
            })
        })

        if (notesToCreate.length > 0){
            const res = await axios.post("/api/note",notesToCreate,{
                headers: {Authorization : "Bearer " + token}
            })
            alert(res.data.msg)
        }
        if (notesToUpdate.length > 0){
            const res = await axios.put("/api/note",notesToUpdate,{
                headers: {Authorization : "Bearer " + token}
            })
            alert(res.data.msg)
        }
        setActiveNotes([])
        router.push("/main/home")
        setTimeout(() => console.log("msg after 2s"), 2000)
        setRender(true)
    }

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
            let newNotes : any = []
            activeNotes.map((Note,i) => {
                if (i != index){
                    newNotes.push(Note)
                }
            })
            console.log(newNotes)
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
            newNotes.push({...Husk,id: -1, display:"normal", noteTitle:"",noteText:"", status:"new"})
            setActiveNotes(newNotes)
            setRender(true)
        },
        closeAll: () => {
            setActiveNotes([])
            setRender(true)
        }
    }
    const HandleDelete = async (noteId,index) => {
        const token = vaultSession.token
        const res = await axios.delete("/api/note",{
            params:{
                noteId: noteId
            },
            headers: {
                Authorization: ("Bearer "+token)
            }
        })
        alert(res.data.msg)
        router.push("/main/home")
        Toggle.delete(index)
        setRender(true)
    }

    return (
        <div className={"absolute w-full h-full bot-0"}>
            <div className={"static w-full min-w-full min-h-full flex justify-center items-center gap-2 flex-wrap h-full duration-200 z-50 " + (isEditing? "-translate-y-full":"")}>
                {activeNotes.map((Note,key) => {
                    if (Note.display != "minimized"){
                        return <NoteElement key={key} vaultTags={vaultTags} Notes={activeNotes} setNotes={setActiveNotes} index={key} Toggle={Toggle} HandleDelete={HandleDelete}/>
                    }
                })}
            </div>
            <div className={"relative w-full " + (isFull? "-z-10":"")}>
                <div className="fixed bottom-2 right-2 w-full h-10 flex justify-end gap-2 ">
                    {activeNotes.map((Note,key) => {
                        if (Note.display == "minimized"){
                            return (<div key={key}
                                    className="z-30 border flex items-center bg-accent rounded-xl px-2 h-full aspect-[3/1] overflow-hidden hover:cursor-pointer"
                                    onClick={() => {Toggle.normalize(key)}}
                                    >
                                        <p className="text-nowrap">
                                            {Note.noteTitle == "" ? "Empty Note" :
                                                (Note.noteTitle.length > 15 ? Note.noteTitle.slice(0,12) + " ...": Note.noteTitle )
                                            }
                                        </p>
                                        
                                    </div>)
                        }
                    })}
                    <NoteButton Toggle={Toggle} HandleSave={HandleSave} isActive={activeNotes.length != 0}/>
                </div>
            </div>
        </div>
    )
}

export default NotesProvider
