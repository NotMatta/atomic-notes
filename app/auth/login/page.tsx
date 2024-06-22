"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

const LoginPage = () => {

    const [data,setData] = useState({vaultName:"",vaultPassword:""})
    const router = useRouter()

    const handleLogin = async (e:any) => {
        e.preventDefault()
        const res = await axios.post("/api/auth/login",data)
        alert(res.data.msg)
        if (res.data.token){
            const res2 = await axios.get("/api/tag",{headers:{Authorization : ("Bearer "+ res.data.token)}})
            console.log(res2.data)
            localStorage.setItem("vaultTags",JSON.stringify(res2.data.Tags))
            localStorage.setItem("vaultName",JSON.stringify(data.vaultName))
            localStorage.setItem("token",JSON.stringify(res.data.token))
            router.push("/main/home")
        }
    }

    return (
        <form onSubmit={(e) => handleLogin(e)} className="bg-background w-2/3 rounded-lg grid grid-cols-6 box-border p-4 gap-4 border">
            <h3 className="font-extrabold w-full text-center col-span-6 mb-4">LOGIN</h3> 
            <label className="col-span-2">Vault Name:</label>
            <input  type="text"
                    className="col-span-4 bg-transparent outline-none border-b border-b-accent"
                    placeholder="Type Vault Name here.."
                    value={data.vaultName}
                    onChange={(e:any) => setData({...data,vaultName:e.target.value})}
                    />
            <label className="col-span-2">Password:</label>
            <input  type="password"
                    className="col-span-4 bg-transparent outline-none border-b border-b-accent"
                    placeholder="Type password here.."
                    value={data.vaultPassword}
                    onChange={(e:any) => setData({...data,vaultPassword:e.target.value})}
                    />
            <br/>
            <Button type="submit" className="font-bold col-span-4">Sign In</Button>
            <br/>
            <Link  className="col-span-6 text-center underline" href="/auth/register">Don`t have an account?</Link>
        </form>
    )
}
export default LoginPage
