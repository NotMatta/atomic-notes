import { authVerification, getParams, tokenVerification } from "@/lib/apiUtils"
import prisma from "@/prisma/prisma-client"

const GET = async (req: Request) => {
    const token = authVerification(req)
    if(!token){
        return Response.json({msg: "Unvalid authentication"})
    }
    const decoded = await tokenVerification(token)
    if(!decoded){
        return Response.json({msg: "Unvalid token"})
    }
    const  params = getParams(req)
    let Notes = []
    const key = decodeURIComponent(params.noteTitle)
    if (params.tagId == "any"){
        Notes = await prisma.note.findMany({
            where: {
                noteTitle: {contains: key},
                vaultId: decoded.vaultId
            }
    })} else {
        Notes = await prisma.note.findMany({
            where: {
                noteTitle: {contains: key},
                tagId: Number(params.tagId),
                vaultId: decoded.vaultId
            }
    })}
    return Response.json({msg: "yee", Notes})
}

const POST = async (req: Request) => {
    const token = authVerification(req)
    if(!token){
        return Response.json({msg: "Unvalid authentication"})
    }
    const decoded = await tokenVerification(token)
    if(!decoded){
        return Response.json({msg: "Unvalid token"})
    }
    const notes = await req.json()
    console.log(notes)
    const Notes = await prisma.note.createMany({
        data: notes.map( (note:any) => {return {
            noteTitle:note.noteTitle,
            noteText: note.noteText,
            vaultId: decoded.vaultId,
            tagId: note.tagId
        }})
    })
    return Response.json({msg: "Notes Created", Notes})
}


const PUT = async (req: Request) => {
    const token = authVerification(req)
    if(!token){
        return Response.json({msg: "Unvalid authentication"})
    }
    const decoded = await tokenVerification(token)
    if(!decoded){
        return Response.json({msg: "Unvalid token"})
    }
    const notes = await req.json()

    notes.map(async (note:any) => {
        await prisma.note.update({
            where: {id: note.noteId},
            data: {
                noteTitle: note.noteTitle,
                noteText: note.noteText,
                tagId: note.tagId,
                modificationDate: new Date()
            }
        })
    })
    return Response.json({msg: "Notes Updated"})
}


const DELETE = async (req: Request) => {
    const token = authVerification(req)
    if(!token){
        return Response.json({msg: "Unvalid authentication"})
    }
    const decoded = await tokenVerification(token)
    if(!decoded){
        return Response.json({msg: "Unvalid token"})
    }
    const {noteId} = getParams(req)
    await prisma.note.delete({
        where: {
            id: Number(noteId),
            vaultId: decoded.vaultId
        },
    })
    return Response.json({msg: "Note Deleted"})
}

export {GET,POST,PUT,DELETE}
