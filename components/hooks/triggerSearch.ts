import { useState } from "react";

const useSearch = () => {
    const [load,setLoad] = useState(false)
    return {
        load,
        setLoad,
        triggerLoad: () => {
            console.log(load)
            console.log("yee")
            setLoad(false)}
    }
}

export default useSearch
