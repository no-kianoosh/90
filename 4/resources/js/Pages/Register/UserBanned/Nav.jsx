import { Clock, LogoutBtn } from '@/comcom/Mine';
import { router, usePage, progress, Link } from '@inertiajs/react'
import clsx from "clsx";
const Nav = (className) => {
    return (
        <div className={clsx("w-full", className)}>
            <nav className="flex items-center justify-between bg-blue-400/10 px-4 py-1 shadow-md text-blue-900 rounded-sm m-1 ">
                <div className="fji gap-4">
                    <LogoutBtn />
                </div>
                <div className="fji gap-3">
                    <div className="text-sm text-white">{usePage().props.date}</div>
                    <Clock className="text-white text-sm tracking-widest" />
                    <div className=" rounded-xl border border-lime-400 text-lime-600 fji text-xs pr-2 bg-white">HoPoN
                        <img className="size-10 rounded-2xl " src="/img/logo.jpg" alt="Login background" />
                    </div>
                </div>
            </nav >
        </div >
    );
}

export default Nav;