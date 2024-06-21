import prisma from "@/prisma/prisma-client"
//@ts-ignore
import bcrypt from "bcryptjs"
//@ts-ignore
import jwt from "jsonwebtoken"

export const POST = async (req:Request) => {
    const {vaultName,vaultPassword} = await req.json()
    const Vault = await prisma.vault.findFirst({where: {vaultName}})
    if (!Vault){
        return Response.json({msg: "Vault doesn't exist on the database"})
    }
    const MatchPassword = await bcrypt.compare(vaultPassword,Vault.vaultPassword)
    if (!MatchPassword){
        return Response.json({msg: "Wrong Password"})
    }
    const payload = {
        vaultId : Vault.id,
        vaultName
    }
    const expiration = 3600 * 12

    const secret = process.env.JWT_SECRET

    const token = jwt.sign(payload,secret,{expiresIn:expiration})

    return Response.json({token})
    
}
