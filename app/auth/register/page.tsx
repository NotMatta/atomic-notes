"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import axios from "axios"
const RegisterPage = () => {

    const [data,setData] = useState({vaultName:"",vaultPassword:"",CPassword:""})
    const handleRegister = async (e:any) => {
        e.preventDefault()
        if (data.vaultName.length > 15){
            alert("Vault Name too long")
            return
        }
        if (data.vaultPassword != data.CPassword){
            alert("Passwords not matching")
            return
        }
        const res = await axios.post("/api/auth/register",{
            vaultName: data.vaultName,
            vaultPassword: data.vaultPassword
        })
        alert(res.data.msg)
        console.log(res.data)
        return
    }

    return (
        <form onSubmit={(e) => handleRegister(e)} className="bg-background w-4/5 rounded-lg grid grid-cols-4 box-border p-4 gap-4 border">
            <h3 className="font-extrabold w-full text-center col-span-4 mb-4">Register</h3> 
            <label >Vault Name</label>
            <input  type="text"
                    className="col-span-3 bg-transparent outline-none border-b border-b-accent"
                    placeholder="Type vault name here.."
                    value={data.vaultName}
                    onChange={(e:any) => setData({...data,vaultName:e.target.value})}
                    />
            <label >Password:</label>
            <input  type="password"
                    className="col-span-3 bg-transparent outline-none border-b border-b-accent"
                    placeholder="Type password here.." 
                    value={data.vaultPassword}
                    onChange={(e:any) => setData({...data,vaultPassword:e.target.value})}
                    />
            <label >Verification:</label>
            <input  type="password"
                    className="col-span-3 bg-transparent outline-none border-b border-b-accent"
                    placeholder="Type password again here.."
                    value={data.CPassword}
                    onChange={(e:any) => setData({...data,CPassword:e.target.value})}
                    />
            <br/>
            <Button type="submit" className="font-bold col-span-2">Sign Up</Button>
            <br/>
            <Link  className="col-span-4 text-center underline" href="/auth/login">Already Have an account?</Link>
        </form>
    )
}
export default RegisterPage
