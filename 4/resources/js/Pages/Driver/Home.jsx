// App.jsx
import { Circle, List } from "lucide-react";
import { useState } from "react";
import Alert from "../../comcom/Alert";
import Load from "@/comcom/Preload"
import SideBar from "./components/SideBar";

import { Button } from "@/comcom/Mine"
import { Clock } from "../../comcom/Mine";
import { usePage } from "@inertiajs/react";
import Body from "./components/Body";

const App = () => {
    const [open, setOpen] = useState(true);
    return (
        <Load>
            <div className="w-full h-full min-h-screen flex p-2 ">
                <title>HopOn</title>
                <div className="absolute fji top-2 left-0 text-white text-xs">
                    <Clock />
                    <span className="pl-2 -pr-2">{usePage().props.days[0]}</span>
                </div>
                <SideBar open={open} setOpen={setOpen} />
                <Body />
                <Alert />
            </div>
        </Load >
    );
};

export default App;

