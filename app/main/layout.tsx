import NavBar from "@/components/nav-bar"
import NotesProvider from "@/components/notes-provider"

const Layout = ({children}:{children: React.ReactNode}) => {
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
