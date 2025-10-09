import Nav from "./DriverReg/Nav"
import Body from "./DriverReg/Body"
import { Theme } from "@radix-ui/themes";
import Alert from "@/comcom/Alert";
import { usePage } from "@inertiajs/react";


const App = () => {
    return (
        <Load>
            <div className="w-full h-full min-h-screen flex flex-col"></div>
            <title>Banned</title>
            <Nav />
            <div className="w-full flex-1 fji flex-col text-white gap-2">
                <div className="px-6 py-1 fji text-white gap-2  border-b-1 mb-3">
                    <span className="tracking-widest">کاربر</span>
                    <span>عزیز</span>
                </div>
                <div className="fji gap-2 flex-col">
                    <div> ❀ متاسفانه ارائه خدمات مقدور نمی باشد ❀</div>
                </div>
                <div className="p-2"> ☆ ☆ ☆ ☆ ☆ HoPoN  ☆ ☆ ☆ ☆ ☆</div>
            </div>
            <Alert />
        </Load>
    );
};

export default App;

