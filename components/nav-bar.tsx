"use client"
import { Search } from "lucide-react"
import { ModeToggle } from "./mode-toggle"
import ProfileToggle from "./profile-toggle"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

const NavBar = () => {

    const router = useRouter()
    const [searchKey,setSearchKey] = useState("")

    const HandleSearch = (e:any) => {
        e.preventDefault()
        let key = encodeURIComponent(searchKey)
        router.push("/main/search/searchKey="+key+"&tag=any")
    }

    return (
        <div className="w-full flex justify-between items-center h-14 border-b border-b-accent box-border px-2">
           <h3 className="font-bold w-1/3">Atomic Notes</h3> 
           <form onSubmit={HandleSearch} className="flex border bprder-accent rounded-xl w-1/3 max-w-96">
                <Button type="submit" variant="outline" size="icon" className="border-none bg-transparent"><Search className="h-[1.2rem] w-[1.2rem]" /></Button>
                <input  className="border-none focus-visible:outline-none bg-transparent"
                        placeholder="Search for notes.."
                        value={searchKey}
                        onChange={(e) => {setSearchKey(e.target.value)}}
                            />
           </form>
           <div className="flex justify-end items-center gap-2 w-1/3">
                <ModeToggle/>
                <ProfileToggle/>
           </div>
        </div>
    )
}
export default NavBar
