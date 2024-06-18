const Layout = ({children} : {children:React.ReactNode}) => {
    return (
        <div className="w-full h-full flex">
            <div className="border w-3/5 box-border p-4 flex flex-col gap-3">
                <h1 className="font-extrabold ">
                    Atomic Notes
                </h1>
                <h3>
                    One place for all your notes
                </h3>
            </div>
            <div className="border w-2/5 bg-accent flex justify-center items-center">
                {children} 
            </div>
        </div>
    )
}

export default Layout
