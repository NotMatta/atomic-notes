"use client"

import NavBar from "@/components/nav-bar"
import NotesProvider from "@/components/notes-provider"
import useAuth from "@/components/hooks/useAuth"
import NotesContext from "@/components/note-components/notesContext"
import useNotes from "@/components/hooks/useNotes"

const Layout = ({children}:{children: React.ReactNode}) => {

    const {session,useRefresh} = useAuth()
    const value = useNotes()
    return (
        <div className="w-full h-full flex flex-col">
            <NavBar/>
            <div className="relative w-full h-full overflow-hidden">
                    {children}
                <NotesContext.Provider value={value}>
                    <NotesProvider vaultSession={session}/>
                </NotesContext.Provider>
            </div>

        </div>
    )
}
export default Layout
