import prisma from "@/prisma/prisma-client"
//@ts-ignore
import bcrypt from "bcryptjs"
export const POST = async (req:Request) => {
    const {vaultName,vaultPassword} = await req.json()
    const res = await prisma.vault.findFirst({where: { vaultName: vaultName}})
    if (res){
        return Response.json({msg: "Vault Alraedy exits with the same name!"})
    }
    const hashedPassword = await bcrypt.hash(vaultPassword,10)
    await prisma.vault.create({data:{vaultName,vaultPassword:hashedPassword}})
    return Response.json({msg: "Vault Created! you may proceed to loggin in"})
}
