import { createContext } from "react";

const RenderContext = createContext({
    render: true,
    setRender: () => {}
})

export default RenderContext
