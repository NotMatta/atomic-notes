//@ts-ignore
import jwt from "jsonwebtoken"
const secret  = process.env.JWT_SECRET

const authVerification = (req:Request) => {
    const authHeader = req.headers.get("Authorization")
    if(!authHeader){
        return null
    }
    const token = authHeader.split(' ')[1];
    return token
}


const tokenVerification = async (token:string) => {
    try{
        const decoded = jwt.verify(token,secret)
        return decoded
    } catch(err){
        return null
    }
}

const getParams = (req:Request) => {
    console.log(req.url)
    const params = decodeURIComponent(req.url).split("?")[1].split("&")
    let seperateParams : any = {}
    params.map((param) => {
        const paramName = param.split("=")[0]
        const paramValue = param.split("=")[1]
        seperateParams[paramName] = paramValue
    })
    return seperateParams
}

const getURLParams = (url: any) => {
    const params = decodeURIComponent(url).split("&")
    let seperateParams : any = {}
    params.map((param) => {
        const paramName = param.split("=")[0]
        const paramValue = param.split("=")[1]
        seperateParams[paramName] = paramValue
    })
    return seperateParams
}

export {
    authVerification,
    tokenVerification,
    getParams,
    getURLParams
}
