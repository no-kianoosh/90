import Modal from "@/comcom/modal"
import { useContext, useState, useRef, useEffect } from 'react';
import { DropdownMenu, Button, IconButton, Dialog, Flex, TextField } from "@radix-ui/themes";
import { PhoneNumberInput } from "./desk-comp/PhoneNumberInput";
import { router, usePage, progress, Link } from '@inertiajs/react'
import { ALRT_ERR, ALRT_OK } from "@/comcom/Alert";
import { G, GSet } from "./../bmr1"
import { Car, LoaderCircle } from "lucide-react";

export function Download_Modal() {
    const close = () => GSet((o) => o.mod.download = false);
    return (

        <Modal open={G((O) => O.mod.download)} closeOnClickOutside={true} onClose={close} title="دانلود برنامه">
            <div className="p-0 flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center my-4 gap-4 px-20">
                    <Button color="lime" className="flex-1"> دانلود برای IOS</Button>
                    <Button color="sky" className="flex-1"> دانلود برای Android</Button>
                </div>
                {/* footer */}
                <div className="w-full my-1 h-[1px] bg-gray-200"></div>
                <Button className="flex !bg-red-500" onClick={close}>بستن</Button>
            </div>

        </Modal>
    );
}

export function Rules_Modal() {
    const { props } = usePage();
    const { rules, rulesprivate } = props;
    const close = () => GSet((o) => o.mod.rules = false);
    const items = rules.split("\n").map((rule, index) => rule.trim()).filter(Boolean); // remove empty strings
    const itoms = rulesprivate.split("\n").map((rule, index) => rule.trim()).filter(Boolean);
    const [page, setPage] = useState(true);

    return (
        <Modal open={G((O) => O.mod.rules)} closeOnClickOutside={false} onClose={close} z={100} title={" قوانین سایت - قوانین حریم خصوصی"} >
            <div className="flex flex-row p-1 gap-2">
                <Button className={page ? "!bg-blue-500" : "!bg-gray-300"} onClick={() => setPage(true)}>قوانین سایت</Button>
                <Button className={!page ? "!bg-emerald-500" : "!bg-gray-300"} onClick={() => setPage(false)}>قوانین حریم خصوصی</Button>
            </div>
            {page && <div className="px-5 text-sm flex flex-col justify-center items-start min-w-[50vw] max-h-[90vh]">
                <div className="max-h-[70vh] px-5 py-1 overflow-auto ">
                    <ul>
                        {items.map((rule, index) => (
                            <li className="p-1" key={index}>{rule}</li>
                        ))}
                    </ul>
                </div>
            </div>
            }
            {!page && <div className="px-5 flex  text-sm flex-col justify-center items-start min-w-[50vw] max-h-[90vh]">
                <div className="max-h-[70vh] px-5 py-1  overflow-auto ">
                    <ul>
                        {itoms.map((rule, index) => (
                            <li className="p-1" key={index}>{rule}</li>
                        ))}
                    </ul>
                </div>
            </div>
            }
            <div className="w-full text-center border-t-1 pt-1">
                <Button className="flex !bg-red-500" onClick={close}>بستن</Button>
            </div>
        </Modal >

    );
}

export function Login_Modal() {
    const [num, setNum] = useState("0939-658-8356");
    const [ver, setVer] = useState("12345");
    const close = () => GSet((o) => o.mod.login = false);
    const [load, loadSet] = useState(false);
    const [verifyPage, verifyPageSet] = useState(false);
    const { dat } = usePage().props;

    const inputRef = useRef(null);
    const verifyInputRef = useRef(null);
    const loginOpen = G((o) => o.mod.login);
    const userType = G((o) => o.user.type);
    //-------------------------------------------------------------------------------

    useEffect(() => {
        if (loginOpen) {
            if (!verifyPage && inputRef.current) {
                inputRef.current.focus();
            } else if (verifyPage && verifyInputRef.current) {
                verifyInputRef.current.focus();
            }
        }
    }, [loginOpen, verifyPage]); // ✅ use the variable instead
    const handleInput = (e) => {
        let value = e.target.value;
        value = value
            .replace(/\D/g, "") // remove non-digits
            .slice(0, 11) // limit to 11 numbers
            .replace(/^(\d{4})(\d{0,3})(\d{0,4})$/, (_, a, b, c) =>
                [a, b, c].filter(Boolean).join("-")
            );
        setNum(value);
    };
    const handlecode = async () => {
        try {
            let [sta, str] = checkPhoneNumber(num)
            if (!sta) {
                ALRT_ERR("لطفا شماره تماس را به درستی وارد کنید")
                return;
            }
            progress.start();
            loadSet(true);
            let data = { num: str, type: (userType == "رانندگان") ? "drv" : "mos" };
            const r = await axios.post('/code', data, { timeout: 5000 });
            progress.finish()
            loadSet(false);
            if (!r.data.suc) {
                ALRT_ERR(r.data.msg)
                return;
            }
            ALRT_OK(r.data.msg);
            verifyPageSet(true)
        } catch (error) {
            console.log(error);
            progress.finish()
            loadSet(false);
            ALRT_ERR("مجددا تلاش کنید", "خطای سرور");

        }
    }
    const checkPhoneNumber = (num) => {
        const str = String(num).replace(/-/g, "");
        return [/^09\d{9}$/.test(str), str];
    }
    const handleInputVer = (e) => {
        let value = e.target.value;
        value = value
            .replace(/\D/g, "") // remove non-digits
            .slice(0, 5);
        if (e.target.value.length > 5) return;

        if (e.target.value !== value) {
            ALRT_ERR("لطفا از اعداد استفاده کنید");
            return;
        }
        setVer(value);
    }
    const checkVerifyCode = (ver) => {
        const str = String(ver).replace(/-/g, "");
        return /^\d{5}$/.test(str);
    }
    const handleverify = async () => {

        if (!checkVerifyCode(ver)) {
            ALRT_ERR("لطفا کد تایید را به درستی وارد کنید")
            return;
        }
        try {
            progress.start();
            loadSet(true);
            let data = { code: ver };
            const r = await axios.post('/verify', data, { timeout: 5000 });
            progress.finish()
            loadSet(false);
            if (!r.data.suc) {
                ALRT_ERR(r.data.msg)
                return;
            }
            ALRT_OK(r.data.msg);
            GSet((o) => o.mod.login = false);
            window.location.reload();
        } catch (error) {
            progress.finish()
            loadSet(false);
            ALRT_ERR("مجددا تلاش کنید", "خطای سرور");
        }
    }
    return (
        <Modal open={G((O) => O.mod.login)} closeOnClickOutside={false} onClose={close} title={" ورود به ترمینال " + userType} >
            {!verifyPage &&
                <div className="px-5 flex flex-col justify-center items-center">
                    <div className="flex flex-row gap-3 mt-1">
                        <div onClick={() => GSet((o) => o.user.type = "رانندگان")} className={"fji flex-col py-1.5 px-5 rounded-sm border " + (userType == "رانندگان" ? "border-1 border-sky-600 bg-blue-600 text-white" : "bg-white text-gray-400 border-gray-200")}>
                            راننـده
                        </div>
                        <div onClick={() => GSet((o) => o.user.type = "مسافران")} className={"fji flex-col py-1.5 px-5 rounded-sm border " + (userType == "مسافران" ? "border-1 border-sky-600 bg-blue-600 text-white" : "bg-white text-gray-400 border-gray-200")}>
                            مسافر
                        </div>
                    </div>
                    <div className=" text-sm mt-2 text-red-600 py-1">
                        <div>شماره تماس</div>
                    </div>
                    <input ref={inputRef}
                        type="text" placeholder="0999-888-7766" inputMode="numeric" required value={num} onInput={handleInput}
                        className="text-emerald-800 rounded-md border relative block w-full px-4 py-2 placeholder-gray-500  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center"
                        style={{ letterSpacing: ".4rem", direction: "ltr" }}
                        dir="ltr" size="24"
                    />

                    <div className="w-full text-center my-3">
                        <a onClick={() => GSet((o) => o.mod.rules = true)} className=" text-xs text-blue-600 border-b-1 p-1 cursor-pointer">
                            با ورود به ترمینال این قوانین را میپذیرم
                        </a>
                    </div>
                    <div className="w-full text-center mt-3 mb-1">
                        <button disabled={load} onClick={handlecode} className="text-sm rounded bg-yellow-300 text-black px-4 py-1.5 border-1 cursor-pointer">
                            {load && <LoaderCircle className="animate-spin text-blue-500 w-5 h-5" />}
                            {!load && <span>ارسال کد</span>}
                        </button>
                    </div>
                </div>
            }
            {verifyPage &&
                <div className="px-5 flex flex-col justify-center items-center min-w-[210px]">
                    <div className=" text-sm mt-3 text-red-600 py-1">
                        <div>کد تایید</div>
                    </div>
                    <div className="flex flex-row justify-center ">
                        <input ref={verifyInputRef} className="rounded-md border-1 relative block w-full px-6 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center"
                            size={10} dir="ltr" inputMode="numeric" style={{ letterSpacing: '.4rem', direction: "ltr" }} required value={ver} onChange={handleInputVer}
                        />
                    </div>
                    <div className="text-red-500 text-xs mt-2">{dat?.err == undefined ? "" : dat.err}</div>
                    <div className="w-full text-center mt-3 mb-1">

                        <button disabled={load} onClick={handleverify} className="text-sm rounded bg-emerald-600 text-white px-5 py-1.5 border-1 cursor-pointer">
                            {load && <LoaderCircle className="animate-spin text-blue-500 w-5 h-5" />}
                            {!load && <span> تایید</span>}
                        </button>
                    </div>
                    <div className="w-full text-center my-3">
                        <a onClick={() => verifyPageSet(false)} className=" text-xs text-blue-600 border-b-1  cursor-pointer">
                            ویرایش شماره
                        </a>
                    </div>
                </div>
            }
        </Modal >
    );
}


