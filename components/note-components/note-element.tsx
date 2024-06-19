import { Minus, RectangleHorizontal, X } from "lucide-react"
import { Button } from "../ui/button"

const NoteElement = ({Title,Text,index,Toggle}:any) => {
    return (
        <div className="relative border border-accent rounded-xl w-4/5  min-h-[500px]">
            <div className="absolute top-2 right-2">
                <Button
                size="icon" className="bg-transparent border-none hover:bg-transparent text-primary"
                onClick={() => Toggle.minimize(index)}
                >
                    <Minus className="w-5 h-5"/>
                </Button>
                <Button size="icon" className="bg-transparent border-none hover:bg-transparent text-primary">
                    <RectangleHorizontal className="w-5 h-5"/>
                </Button>
                <Button
                size="icon" className="bg-transparent border-none hover:bg-transparent text-primary"
                onClick={() => Toggle.delete(index)}
                >
                    <X className="w-5 h-5"/>
                </Button>
            </div>
           <h2>{Title}</h2>
           <p>{Text}</p>
        </div>
    )
}
export default NoteElement
