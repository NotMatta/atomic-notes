import { tokenVerification, authVerification } from "@/lib/apiUtils"
import prisma from "@/prisma/prisma-client"

export const DELETE = async (req:Request) => {
    const token = authVerification(req)
    if(!token){
        return Response.json({msg:"Unauthorized request"})
    }
    const decoded = await tokenVerification(token)
    if (decoded != null){
       await prisma.vault.delete({where:{vaultName:decoded.vaultName,id: decoded.vaultId}})
       return Response.json({msg: "Vault Deleted!"})
    }
    return Response.json({msg: "Unvalid token"})
}
