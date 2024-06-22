import { useEffect,useState } from "react"
import { useRouter } from 'next/navigation'

const useAuth = () => {
    const router = useRouter()
    const [session,setAuthStatus] : any = useState({vaultName:null,vaultTags:null,token:null,status:"loading"})
    const [check, setCheck] = useState(true)
    useEffect(()=>{
        const init = () => {
            let token = window.localStorage.getItem("token")!
            let vaultTags = window.localStorage.getItem("vaultTags")!
            let vaultName = window.localStorage.getItem("vaultName")!
            if(!token){
                setAuthStatus({...session,status:"unauthenticated"})
                if(window.location.pathname.indexOf("auth") == -1){
                    router.push("/auth/login")
                }
            } else {
                token = JSON.parse(token)
                vaultTags = JSON.parse(vaultTags)
                vaultName = JSON.parse(vaultName)
                setAuthStatus({token,vaultName,vaultTags,status:"authenticated"})
                if(window.location.pathname.indexOf("main") == -1){
                    router.push("/main/home")
                }
            }
        }
        if (check){
            init()
            setCheck(false)
        }
    },[router,session,check])
    return {
        session,
        setRefresh: () => setCheck(true)
    }
}

export default useAuth
