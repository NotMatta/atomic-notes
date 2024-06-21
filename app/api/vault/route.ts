import prisma from "@/prisma/prisma-client"
//@ts-ignore
import jwt from "jsonwebtoken"

export const DELETE = async (req:Request) => {
    const authHeader = req.headers.get("Authorization")
    if(!authHeader){
        return Response.json({msg:"Unauthorized request"})
    }
    const secret = process.env.JWT_SECRET
    const token = authHeader.split(' ')[1];
    try{
       const decoded = jwt.verify(token,secret)
       await prisma.vault.delete({where:{vaultName:decoded.vaultName,id: decoded.vaultId}})
       return Response.json({msg: "Vault Deleted!"})
    } catch(err){
        return Response.json({msg: "Unvalid token"})
    }
}
