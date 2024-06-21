import { Button } from "@/components/ui/button"
import Link from "next/link"
const LoginPage = () => {
    return (
        <form className="bg-background w-2/3 rounded-lg grid grid-cols-6 box-border p-4 gap-4 border">
            <h3 className="font-extrabold w-full text-center col-span-6 mb-4">LOGIN</h3> 
            <label className="col-span-2">Vault Name:</label>
            <input type="text" className="col-span-4 bg-transparent outline-none border-b border-b-accent" placeholder="Type Vault Name here.."/>
            <label className="col-span-2">Password:</label>
            <input type="password" className="col-span-4 bg-transparent outline-none border-b border-b-accent" placeholder="Type password here.."/>
            <br/>
            <Button className="font-bold col-span-4">Sign In</Button>
            <br/>
            <Link  className="col-span-6 text-center underline" href="/auth/register">Don`t have an account?</Link>
        </form>
    )
}
export default LoginPage
