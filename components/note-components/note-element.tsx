import { Minus, RectangleHorizontal, X } from "lucide-react"
import { Button } from "../ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const NoteElement = ({Notes,setNotes,vaultTags,index,Toggle}:any) => {

    return (
        <div 
            className={"relative bg-background p-4 duration-200 flex flex-col " + (Notes[index].display == "normal"? 'w-4/5 border min-h-[500px] h-[500px] max-h-[650px] rounded-xl' : "w-full h-full")}>
            <div className="absolute top-2 right-2 flex gap-2">
                <Select onValueChange={(value) => setNotes(Notes.map((el,i) => {
                    if (i == index){
                        return {...el,tagIndex: value}
                    } else {
                        return el
                    }
                }))}>
                    <SelectTrigger>
                        <SelectValue placeholder={vaultTags[Notes[index].tagIndex].tagTitle!}/>
                    </SelectTrigger>
                    <SelectContent>
                        {vaultTags.map((tag,key) => (
                            <SelectItem key={key} value={key}>{tag.tagTitle}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                value={Notes[index].noteTitle}
                onChange={(e) => setNotes(Notes.map((el,i) => {
                    if (i == index){
                        return {...el,noteTitle: e.target.value}
                    } else {
                        return el
                    }
                }))}
           />
           <textarea className="focus-visible:outline-none bg-transparent w-full h-full" placeholder="Text here"
                value={Notes[index].noteText}
                onChange={(e) => setNotes(Notes.map((el,i) => {
                    if (i == index){
                        return {...el,noteText: e.target.value}
                    } else {
                        return el
                    }
                }))}
           />
        </div>
    )
}
export default NoteElement
