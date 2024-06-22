"use client"
import { LogOut, Settings, UserRound } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

const ProfileToggle = () => {

    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none" asChild>
                <Button variant="outline" size="icon" className="border rounded-full aspect-square w-9 h-9 flex items-center">
                    <UserRound className="h-[1.3rem] w-[1.3rem]"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="flex items-center gap-2">
                    <Settings className="h-[1.2rem] w-[1.2rem]"/>
                    <p>Settings</p>
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={() => {localStorage.removeItem("token"),router.push("/auth/login")}}
                    className="flex items-center gap-2">
                    <LogOut className="h-[1.2rem] w-[1.2rem]"/>
                    <p>Log out </p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileToggle
