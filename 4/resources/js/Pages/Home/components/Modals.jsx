import Modal from "@/comcom/modal"
import { useContext, useState } from 'react';
import { DropdownMenu, Button, IconButton, Dialog, Flex, TextField } from "@radix-ui/themes";
import { PhoneNumberInput } from "./desk-comp/PhoneNumberInput";
import { router, usePage } from '@inertiajs/react'
import { G, GSet } from "./../bmr1"

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

export function Login_Modal() {
    const close = () => GSet((o) => o.mod.login = false);
    return (
        <Modal open={G((O) => O.mod.login)} closeOnClickOutside={false} onClose={close} title={" ورود به ترمینال " + G((O) => O.user.type)} >
            <div className="px-5 flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center ">
                    <PhoneNumberInput />
                </div>
                <div onClick={showRulesModal} className="w-full text-center my-3">
                    <a onClick={() => GSet((o) => o.mod.rules = true)} className=" text-xs text-blue-600 border-b-1 p-1 cursor-pointer">
                        با ورود به ترمینال این قوانین را میپذیرم
                    </a>
                </div>
                <div className="w-full text-center mt-3">
                    <button className="text-sm rounded bg-amber-300 text-black px-4 py-1.5 border-1 cursor-pointer">
                        ارسال کد
                    </button>
                </div>
            </div>
        </Modal >
    );
    function showRulesModal() {
        // router.post("/rules", {}, {
        //     only: ["rules"],
        //     preserveState: true,
        //     preserveScroll: true,
        //     onSuccess: (page) => {
        //         console.log(page.props.rules); // rules data
        //         ST({ type: "mod", act: "set", val: "rules" });
        //     },
        // });
    }
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
            {page && <div className="px-5 flex flex-col justify-center items-start min-w-[50vw] max-h-[90vh]">
                <div className="max-h-[70vh] px-5 py-1 overflow-auto ">
                    <ul>
                        {items.map((rule, index) => (
                            <li className="p-1" key={index}>{rule}</li>
                        ))}
                    </ul>
                </div>
            </div>
            }
            {!page && <div className="px-5 flex flex-col justify-center items-start min-w-[50vw] max-h-[90vh]">
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