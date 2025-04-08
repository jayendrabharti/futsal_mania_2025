import { LoaderCircle } from "lucide-react";

export default function loading(){
    return(
        <div className="w-full h-full flex flex-row justify-center items-center">
            <LoaderCircle className="size-16 animate-spin"/>
        </div>
    )
}