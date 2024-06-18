import { Button } from "@/components/ui/button"
import Link from "next/link"
const RegisterPage = () => {
    return (
        <form className="bg-background w-2/3 rounded-lg grid grid-cols-4 box-border p-4 gap-4 border">
            <h3 className="font-extrabold w-full text-center col-span-4 mb-4">Register</h3> 
            <label >Email:</label>
            <input type="email" className="col-span-3 bg-transparent outline-none border-b border-b-accent" placeholder="Type email here.."/>
            <label >Password:</label>
            <input type="password" className="col-span-3 bg-transparent outline-none border-b border-b-accent" placeholder="Type password here.."/>
            <label >Confirm Password:</label>
            <input type="password" className="col-span-3 bg-transparent outline-none border-b border-b-accent" placeholder="Type password again here.."/>
            <br/>
            <Button className="font-bold col-span-2">Sign Up</Button>
            <br/>
            <Link  className="col-span-4 text-center underline" href="/auth/login">Already Have an account?</Link>
        </form>
    )
}
export default RegisterPage
