
import Olampic from "./Olampic";
import { Button } from "@/comcom/Mine"
import { DollarSign, FolderPlus, HandMetal, List, Mailbox, Receipt, UserRound, LucideGlasses, Telescope, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { LogoutBtn } from "../../../comcom/Mine";
import { G, RSet, GSet } from "../bmr1";

export default function SideBare({ open, setOpen }) {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState("newtrv");
    const ddd = G((O) => O.bod);
    function handleClick(e, value) {
        e.stopPropagation();
        setSelected(value);
        RSet("bod");
        GSet((O) => O.bod[value + ""] = true);
    }
    return (
        <div onClick={() => setOpen(!open)} className="min-w-[50px] whitespace-nowrap flex flex-col items-center w-fit gap-4 bg-blue-400/55  py-2 px-1 text-sm rounded-2xl">
            <Olampic open={open} />
            <div className=""></div>
            {/* new trv */}
            <div className="min-w-[30px] h-[30px] fji text-white rounded-sm" onClick={(e) => handleClick(e, "user")}>
                <div className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <img
                        className={`${selected === "user" ? "border-emerald-500 " : "bg-blue-900 "} size-14 rounded-full border-2`}
                        src={`/storage/users/9863e408e2ff.jpg`} alt="User" />
                </div>
                <div className={`transition-all duration-700 ease-in-out ${!open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <UserRound strokeWidth={1} className={`${selected === "user" ? "bg-emerald-500 " : "bg-blue-900 "} size-8  p-1 rounded-full cursor-pointer`} />
                </div>
            </div>
            <div className="mt-4"></div>
            {/* new trv */}
            <div className="min-w-[30px] h-[30px] fji text-white rounded-sm" onClick={(e) => handleClick(e, "newtrv")}>
                <div className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <Button className={`${selected === "newtrv" ? "bg-emerald-500 " : "bg-blue-900 "} min-w-[120px]  py-1 px-4`}>ثبت سفر جدید</Button>
                </div>
                <div className={`transition-all duration-700 ease-in-out ${!open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <FolderPlus strokeWidth={1} className={`${selected === "newtrv" ? "bg-emerald-500 " : "bg-blue-900 "} size-8  p-1 rounded-sm cursor-pointer`} />
                </div>
            </div>
            {/* trvs */}
            <div className="min-w-[30px] h-[30px] fji text-white rounded-sm" onClick={(e) => handleClick(e, "trvs")}>
                <div className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <Button className={`${selected === "trvs" ? "bg-emerald-500 " : "bg-blue-900 "} min-w-[120px]  py-1 px-4`}>سفــرهــا  </Button>
                </div>
                <div className={`transition-all duration-700 ease-in-out ${!open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <List strokeWidth={1} className={`${selected === "trvs" ? "bg-emerald-500 " : "bg-blue-900 "} size-8  p-1 rounded-sm cursor-pointer`} />
                </div>
            </div>
            {/* box */}
            <div className="min-w-[30px] h-[30px] fji text-white rounded-sm" onClick={(e) => handleClick(e, "box")}>
                <div className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <Button className={`${selected === "box" ? "bg-emerald-500 " : "bg-blue-900 "} min-w-[120px]  py-1 px-4`}>پشتیبانی  </Button>
                </div>
                <div className={`transition-all duration-700 ease-in-out ${!open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <Mailbox strokeWidth={1} className={`${selected === "box" ? "bg-emerald-500 " : "bg-blue-900 "} size-8  p-1 rounded-sm cursor-pointer`} />
                </div>
            </div>
            {/* transactions */}
            <div className="min-w-[30px] h-[30px] fji text-white rounded-sm" onClick={(e) => handleClick(e, "trns")}>
                <div className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <Button className={`${selected === "trns" ? "bg-emerald-500 " : "bg-blue-900 "} min-w-[120px]  py-1 px-4`}>تراکنش ها  </Button>
                </div>
                <div className={`transition-all duration-700 ease-in-out ${!open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <Receipt strokeWidth={1} className={`${selected === "trns" ? "bg-emerald-500 " : "bg-blue-900 "} size-8  p-1 rounded-sm cursor-pointer`} />
                    <div></div>
                </div>
            </div>
            {/* spec */}
            <div className="mt-4 min-w-[30px] h-[30px] fji text-white rounded-sm" onClick={(e) => handleClick(e, "spec")}>
                <div className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <Button className={`${selected === "spec" ? "bg-emerald-500 " : "bg-blue-900 "} min-w-[120px]  py-1 px-4`}>  اختصاصی ها  </Button>
                </div>
                <div className={`transition-all duration-700 ease-in-out ${!open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <Telescope strokeWidth={1} className={`${selected === "spec" ? "bg-emerald-500 " : "bg-blue-900 "} size-8  p-1 rounded-sm cursor-pointer`} />
                </div>
            </div>
            {/* logout */}
            <div className="absolute bottom-8 mt-4 min-w-[30px] h-[30px] fji text-white rounded-sm" onClick={(e) => handleClick(e, "spec")}>
                <div className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>

                    <LogoutBtn />

                </div>
                <div className={`transition-all duration-700 ease-in-out ${!open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <LogOut strokeWidth={1} className={`bg-red-500 size-8  p-1 rounded-sm cursor-pointer`} />
                </div>
            </div>
        </div >

    )

    function Btn({ open }) {
        return (
            <div className="min-w-[30px] h-[30px] fji text-white rounded-sm">
                <div className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <Button onClick={(e) => e.stopPropagation()} className="bg-blue-900 py-1 px-4">ثبت سفر جدید</Button>
                </div>
                <div className={`transition-all duration-700 ease-in-out ${!open ? 'opacity-100 max-w-300' : 'opacity-0 max-w-0 overflow-hidden'}`}>
                    <FolderPlus />
                </div>
            </div>
        );
    }
}