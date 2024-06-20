import { Minus, RectangleHorizontal, X } from "lucide-react"
import { Button } from "../ui/button"

const NoteElement = ({Notes,setNotes,index,Toggle}:any) => {

    return (
        <div 
            className={"relative bg-background p-4 duration-200 flex flex-col " + (Notes[index].display == "normal"? 'w-4/5 border min-h-[500px] h-[500px] max-h-[650px] rounded-xl' : "w-full h-full")}>
            <div className="absolute top-2 right-2">
                <Button
                size="icon" className="bg-transparent border-none hover:bg-transparent text-primary"
                onClick={() => Toggle.minimize(index)}
                >
                    <Minus className="w-5 h-5"/>
                </Button>
                <Button
                size="icon" className="bg-transparent border-none hover:bg-transparent text-primary"
                onClick={() => Notes[index].display == "normal" ? Toggle.full(index) : Toggle.normalize(index)}
                >
                    <RectangleHorizontal className="w-5 h-5"/>
                </Button>
                <Button
                size="icon" className="bg-transparent border-none hover:bg-transparent text-primary"
                onClick={() => Toggle.delete(index)}
                >
                    <X className="w-5 h-5"/>
                </Button>
            </div>
           <input className="text-5xl font-bold focus-visible:outline-none bg-transparent" placeholder="Title Here.."
                value={Notes[index].Title}
                onChange={(e) => setNotes(Notes.map((el,i) => {
                    if (i == index){
                        return {...el,Title: e.target.value}
                    } else {
                        return el
                    }
                }))}
           />
           <textarea className="focus-visible:outline-none bg-transparent w-full h-full" placeholder="Text here"
                value={Notes[index].Text}
                onChange={(e) => setNotes(Notes.map((el,i) => {
                    if (i == index){
                        return {...el,Text: e.target.value}
                    } else {
                        return el
                    }
                }))}
           />
        </div>
    )
}
export default NoteElement
