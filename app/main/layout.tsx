"use client"

import NavBar from "@/components/nav-bar"
import NotesProvider from "@/components/notes-provider"
import useAuth from "@/components/hooks/useAuth"

const Layout = ({children}:{children: React.ReactNode}) => {

    const {session,useRefresh} = useAuth()

    return (
        <div className="w-full h-full flex flex-col">
            <NavBar/>
            <div className="relative w-full h-full overflow-hidden">
                {children}
                <NotesProvider/>
            </div>
        </div>
    )
}
export default Layout
