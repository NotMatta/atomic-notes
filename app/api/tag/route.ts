import { authVerification, tokenVerification, getParams } from "@/lib/apiUtils"
import prisma from "@/prisma/prisma-client"

const GET = async(req:Request) => {
    const token = authVerification(req)
    if(!token){
        return Response.json({msg: "Unvalid authentication"})
    }
    const decoded = await tokenVerification(token)
    if(!decoded){
        return Response.json({msg: "Unvalid token"})
    }
    const Tags = await prisma.tag.findMany({
        where: {
            vaultId: decoded.vaultId
        }
    })
    return Response.json({msg: "Got The Tags", Tags})
}

const POST = async(req:Request) => {
    const token = authVerification(req)
    if(!token){
        return Response.json({msg: "Unvalid authentication"})
    }
    const decoded = await tokenVerification(token)
    if(!decoded){
        return Response.json({msg: "Unvalid token"})
   }
   const {tagTitle} = await req.json()
   const Tag = await prisma.tag.create({data:{
        tagTitle,
        vaultId: decoded.vaultId
   }})
   return Response.json({msg: "Tag Made", Tag})
}


const DELETE = async(req:Request) => {
    const token = authVerification(req)
    if(!token){
        return Response.json({msg: "Unvalid authentication"})
    }
    const decoded = await tokenVerification(token)
    if(!decoded){
        return Response.json({msg: "Unvalid token"})
   }
   const {tagId} = getParams(req)
   await prisma.tag.delete({
        where:{
            id: Number(tagId),
            vaultId: decoded.vaultId
        }
   })
   return Response.json({msg: "tag deleted"})
}
export {GET,POST,DELETE}
