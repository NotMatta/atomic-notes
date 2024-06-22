"use client"

import { getURLParams } from "@/lib/apiUtils" 
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"
import useNotes from "@/components/hooks/useNotes"

const SearchPage = () => {
    const [notes,setNotes] = useState([])
    const {activeNotes,setActiveNotes} = useNotes()
    console.log(activeNotes)
    const params = getURLParams(useParams().param)
    const [isloaded,setLoaded] = useState(false)
    const token = JSON.parse(localStorage.getItem("token")!)


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
            console.log(res.data)
            setLoaded(true)
        }
        if(!isloaded){
            Fetch()
        }
    },[isloaded,token,params])
    
    return (
        <div className="w-full h-full box-border p-4 overflow-scroll flex flex-col gap-8">
            <h2>Search Results</h2>
            <div className="w-full grid grid-cols-5 grid-flow-row gap-4">
                {notes.map((note:any,key:number) => (
                    <div key={key} className="flex flex-col justify-between bg-accent aspect-square rounded-xl hover:scale-105 duration-300 box-border p-4">
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
