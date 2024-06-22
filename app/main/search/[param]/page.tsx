"use client"

import { getURLParams } from "@/lib/apiUtils" 
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "next/navigation"

const SearchPage = () => {
    const [notes,setNotes] = useState([])
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
        <div>
        {notes.map((note) => <h3>{note.noteTitle}</h3>)}
        </div>
    )
}

export default SearchPage
