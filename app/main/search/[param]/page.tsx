"use client"

import { getURLParams } from "@/lib/apiUtils" 
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import NotesContext from "@/components/note-components/notesContext"
import RenderContext from "@/components/note-components/renderContext"

const SearchPage = () => {
    const [notes,setNotes] = useState([])
    const params = getURLParams(useParams().param)
    const [isloaded,setLoaded] = useState(false)
    const {render,setRender} = useContext(RenderContext)
    const token = JSON.parse(localStorage.getItem("token")!)
    const {activeNotes,setActiveNotes}= useContext(NotesContext)


    useEffect(() => {
        const Fetch = async () => {
            const res = await axios.get("/api/note",{
                params:{
                    noteTitle: encodeURIComponent(params.searchKey),
                    tagId: params.tag
                },
                headers: {
                    Authorization: ("Bearer "+token)
                }
            })
            setNotes(res.data.Notes)
            console.log(activeNotes)
            setLoaded(true)
        }
        if(!isloaded){
            Fetch()
        }
    },[isloaded,activeNotes,token,params])
    
    return (
        <div className="w-full h-full box-border p-4 overflow-scroll flex flex-col gap-8">
            <h2>Search Results</h2>
            <div className="w-full grid grid-cols-5 grid-flow-row gap-4">
                {notes.map((note:any,key:number) => (
                    <div
                        key={key}
                        className="flex flex-col justify-between bg-accent aspect-square rounded-xl hover:scale-105 duration-300 box-border p-4"
                        onClick={() => {
                            let newNotes = activeNotes.map((el:any) => {return {
                                ...el,
                               display: "minimized" 
                            }})
                            newNotes.push({
                                id: note.id,
                                display: "normal",
                                noteTitle: note.noteTitle,
                                noteText: note.noteText,
                                status: "update",
                                tagIndex: 0
                            })
                            setActiveNotes(newNotes)
                            setRender(true)
                        }}
                        >
                        <h3 className="font-bold">{note.noteTitle}</h3>
                        <div>
                            <p>Last Modified: </p>
                            <p>{(new Date(note.modificationDate)).toDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchPage
