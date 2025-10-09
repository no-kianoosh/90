import Nav from "./DriverPending/Nav"
import { Theme } from "@radix-ui/themes";
import Alert from "@/comcom/Alert";
import { usePage } from "@inertiajs/react";
import Load from "@/comcom/Preload"


const App = () => {
    return (
        <Load>
            <div className="w-full h-full min-h-screen flex flex-col">
                <Nav className="w-full" />
                <title>ثبت نام راننده</title>
                <div className="w-full flex-1 text-white gap-2 fji flex-col">
                    <div className="px-6 py-1 fji text-white gap-2  border-b-1 mb-3">
                        <span className="tracking-widest">آقای/خانم</span>
                        <span className="text-[110%] text-lime-500">{usePage().props.fam}</span>
                        <span>عزیز</span>
                    </div>
                    <div className="fji gap-2 flex-col">
                        <div> ❀   ثبت نام شما در حال بررسی است، خواهشمند است  منتظر بمانید ❀</div>
                        <div>❀ پس از بررسی از طریق پیامک اطلاع رسانی خواهیم کرد ❀</div>
                        <div>❀  از صبر و شکیبایی شما سپاسگزاریم ❀</div>
                    </div>
                    <div className="p-2"> ☆ ☆ ☆ ☆ ☆ HoPoN  ☆ ☆ ☆ ☆ ☆</div>
                </div>
            </div>
            <Alert />
        </Load>
    );
};

export default App;

