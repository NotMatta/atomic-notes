"use client"

import NavBar from "@/components/nav-bar"
import NotesProvider from "@/components/notes-provider"
import useAuth from "@/components/hooks/useAuth"
import NotesContext from "@/components/note-components/notesContext"
import useNotes from "@/components/hooks/useNotes"
import RenderContext from "@/components/note-components/renderContext"
import { useState } from "react"

const Layout = ({children}:{children: React.ReactNode}) => {

    const {session,useRefresh} = useAuth()
    const value = useNotes()
    const [render,setRender] = useState(true)
    const renderValue = {render,setRender}
    return (
        <div className="w-full h-full flex flex-col">
            <NavBar/>
            <div className="relative w-full h-full overflow-hidden">
                <RenderContext.Provider value={renderValue}>
                    <NotesContext.Provider value={value}>
                            {children}
                        <NotesProvider vaultSession={session}/>
                    </NotesContext.Provider>
                </RenderContext.Provider>
            </div>

        </div>
    )
}
export default Layout
