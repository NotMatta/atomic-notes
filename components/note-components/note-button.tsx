import { Button } from "../ui/button"
import { Check, Plus } from "lucide-react"

const NoteButton = ({Toggle,isActive}:any) => {
    return (
        <div className="relative z-30">
            <div className={"absolute top-[-8px] right-0 -z-10 duration-200 " + (isActive? "-translate-y-[200%]" : "opacity-0")}>
                <Button size="icon" className="rounded-full">
                    <Check />
                </Button>
            </div>
            <div className={"absolute top-[-4px] right-0 -z-10 duration-200 " + (isActive? "-translate-y-[100%]" : "opacity-0")}>
                <Button onClick={() => isActive? Toggle.add() : null}
                    size="icon" className={"rounded-full"}>
                    <Plus/>
                </Button>
            </div>
            <Button size="icon" className="rounded-full z-30" onClick={() => !isActive? Toggle.add() : Toggle.closeAll()}>
                <Plus className={(isActive? "rotate-45 ": "") + "duration-200"}/>
            </Button>
        </div>
    )
}

export default NoteButton
