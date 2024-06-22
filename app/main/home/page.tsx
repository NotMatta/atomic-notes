const Home = () => {


    return (
        <div className="w-full h-full pt-4 px-4 box-border">
        <div className="w-full h-full z-10 flex flex-col gap-4">
        <h3 className="">Recent Opened Notes:</h3> 
        <div className="flex gap-2 w-full">
        {["","","","","",""].map((_el:any,i:number) => (
            <div key={i} className="border aspect-square border-red-300 w-32">
            </div>    
        ))}
        </div>
        </div>
        </div>
    )
}

export default Home

