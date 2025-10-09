// App.jsx
import { Circle, List } from "lucide-react";
import { useState } from "react";
import Alert from "../../comcom/Alert";
import Load from "@/comcom/Preload"
import Olampic from "./components/Olampic";
import { Button } from "@/comcom/Mine"

const App = () => {
    const [open, setOpen] = useState(true);
    return (
        <Load>
            <div className="w-full h-full min-h-screen flex p-2 ">
                <title>HopOn</title>
                <div onClick={() => setOpen(!open)} className="flex flex-col items-center w-fit gap-3 bg-blue-400/55  py-2 px-1 text-sm rounded-2xl transition-all duration-700 ease-in-out" >
                    <Olampic open={open} />
                    <div className="min-w-[50px] h-[30px] fji text-white ">
                        <div className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                            <Button onClick={(e) => e.stopPropagation()} className="bg-red-500 py-1 px-4">ثبت سفر</Button>
                        </div>
                        <div className={`transition-all duration-0 ease-in-out ${!open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                            <List color="white" />
                        </div>
                    </div>
                </div>
                <Alert />
            </div>
        </Load >
    );
};

export default App;

