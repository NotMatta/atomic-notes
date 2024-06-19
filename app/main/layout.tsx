import NavBar from "@/components/nav-bar"

const Layout = ({children}:{children: React.ReactNode}) => {
    return (
        <div className="w-full h-full flex flex-col">
            <NavBar/>
            <div className="h-full">
                {children}
            </div>
        </div>
    )
}
export default Layout
