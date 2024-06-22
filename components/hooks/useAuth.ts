import { useEffect,useState } from "react"
import { useRouter } from 'next/navigation'

const useAuth = () => {
    const router = useRouter()
    const [session,setAuthStatus] = useState({vaultName:null,token:null,status:"loading"})
    const [check, setCheck] = useState(true)
    useEffect(()=>{
        const init = () => {
            let token = window.localStorage.getItem("token")
            if(!token){
                setAuthStatus({...session,status:"unauthenticated"})
                if(window.location.pathname.indexOf("main") != -1){
                    router.push("/auth/login")
                }
            } else {
                setAuthStatus({...session,status:"authenticated"})
                if(window.location.pathname.indexOf("auth") != -1){
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
