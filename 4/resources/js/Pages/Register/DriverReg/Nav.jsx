// create a nav bar with raw react and tailwindcss
import { Button } from "@radix-ui/themes";
import { router } from "@inertiajs/react"

const Nav = () => {
    return (
        <div className="w-full">
            <nav className="flex items-center justify-between bg-blue-400/10 px-4 py-1 shadow-md text-blue-900 rounded-sm m-1 ">
                <div className="fji gap-4">
                    <div className="text-white text-md" style={{ letterSpacing: "9.4px" }}>ثبت نام راننده</div>
                    <button onClick={() => router.post("/logout")} className="bg-orange-500 text-white text-sm rounded-sm px-3 py-1">خروج</button>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <div className="text-blue-300">HopOn</div>
                    <img className="size-10 rounded-2xl border border-lime-400" src="/img/logo.jpg" alt="Login background" />
                </div>
            </nav >
        </div >
    );
}

export default Nav;