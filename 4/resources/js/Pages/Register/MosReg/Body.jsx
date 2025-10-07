import { Label, CharInput, Header, NumInput } from "@/comcom/Mine";
import ImgInput from "@/comcom/ImgInput";
import UploadBar from "@/comcom/uploadBar";
import { ALRT_ERR, ALRT_OK } from "@/comcom/ALert";
import React, { useState, useRef } from "react";
import { router, usePage, progress, Link } from '@inertiajs/react'

const Body = () => {
    const [formData, setFormData] = useState({
        firstName: "علی",
        lastName: "بازرگان",
        phone: usePage().props.number,
        mcode: "4445556677",
        email: "akasj@gmail.com",
    });

    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const mcodeRef = useRef(null);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [percent, setPercent] = useState(0);
    const [successfull, setSeccessfull] = useState(false);
    const [step2Selected, setStep2Selected] = useState(false);
    const maxStep = 3;

    const handleStep = async (action) => {
        if (action === "inc" && step < maxStep) {
            if (step === 1 && await validateStep1()) setStep(step + 1);
            else if (step === 2 && !step2Selected) ALRT_ERR("لطفا عکس چهره خود را ارسال کنید");
            else if (step === 2 && step2Selected) {

                try {
                    progress.start();
                    setLoading(true);
                    const r = await axios.post("/fin-mos-info");
                    progress.finish();
                    setLoading(false);
                    if (!r.data.suc) {
                        ALRT_ERR(r.data.msg);
                        progress.finish();
                        setLoading(false);
                        return;
                    }
                    ALRT_OK(r.data.msg);
                    progress.finish();
                    setLoading(false);
                    setSeccessfull(true);
                    setTimeout(() => window.location.reload(), 2000);
                } catch (error) {
                    console.error(error);
                    ALRT_ERR("خطایی در سرور رخ داده است. لطفا مجددا تلاش کنید");
                    progress.finish();
                    setLoading(false);
                }
            }
        } else if (action === "dec" && step > 1) {
            setStep(step - 1);
        }
        console.log(step2Selected);

        return;
    };

    async function validateStep1() {
        // Step 1: Validate firstName
        if (formData.firstName.trim() === "") {
            ALRT_ERR("لطفا نام را وارد کنید.");
            firstNameRef.current?.focus();
            return false;
        }

        // Step 2: Validate lastName
        if (formData.lastName.trim() === "") {
            ALRT_ERR("لطفا نام خانوادگی را وارد کنید.");
            lastNameRef.current?.focus();
            return false;
        }

        // Step 3: Validate mcode format
        const mcodePattern = /^\d{10}$/;
        if (!mcodePattern.test(formData.mcode)) {
            ALRT_ERR("کد ملی باید دقیقا 10 رقم باشد.");
            mcodeRef.current?.focus();
            return false;
        }

        // Step 4: Send form data to server
        try {
            progress.start();
            setLoading(true);
            const r = await axios.post("/mos-info", formData);
            progress.finish();
            setLoading(false);
            if (!r.data.suc) {
                ALRT_ERR(r.data.msg);
                progress.finish();
                setLoading(false);
                return false;
            }
            ALRT_OK(r.data.msg);
            progress.finish();
            setLoading(false);
            return true;
        } catch (error) {
            console.error(error);
            ALRT_ERR("خطایی در سرور رخ داده است. لطفا مجددا تلاش کنید");
            progress.finish();
            setLoading(false);
            return false; // server error
        }
    }


    return (
        <div className="flex flex-col flex-1 items-center justify-center w-full">
            {/* step indicator */}
            <div className="fji gap-3 mb-2" style={{ direction: "ltr" }}>
                {[...Array(maxStep - 1)].map((_, index) => (
                    <div key={index} className={"size-3 p-3 text-white fji rounded-full " + (index < step ? "bg-emerald-400" : "bg-red-400")}>
                        {index + 1}
                    </div>
                ))}
            </div>
            {successfull &&
                <div className="fji flex-col m-2 p-6 text-white gap-3 bg-gray-400/10 rounded-2xl">
                    <span>ضمن تشکر از شما، ثبت نام با موفقیت انجام شد </span>
                    <span> در حال انتقال به صفحه شخصی...</span>
                </div>}
            {!successfull && <div className="w-fit h-full fji flex-col gap-3 text-sm bg-white bg-3d rounded-lg py-3 mx-2 px-6 text-xs">
                {/* Step 1 */}
                <div hidden={step !== 1} className="text-black space-y-2 fji flex-col">
                    <Header>ثبت نام مسافر</Header>
                    <div className="space-y-3">
                        <div className="fji flex-col">
                            <Label>نام</Label>
                            <CharInput
                                value={formData.firstName}
                                onChange={(val) => handleChange("firstName", val)}
                                length={15}
                                ref={firstNameRef}
                            />
                        </div>

                        <div className="fji flex-col">
                            <Label>نام خانوادگی</Label>
                            <CharInput
                                length={15}
                                value={formData.lastName}
                                onChange={(val) => handleChange("lastName", val)}
                                ref={lastNameRef}
                            />
                        </div>

                        <div className="fji flex-col">
                            <Label>شماره همراه</Label>
                            <CharInput
                                style={{ letterSpacing: "4px" }}
                                disabled
                                value={formData.phone}
                                onChange={(val) => handleChange("phone", val)}
                            />
                        </div>

                        <div className="fji flex-col">
                            <Label>کد ملی</Label>
                            <NumInput
                                value={formData.mcode}
                                onChange={(val) => handleChange("mcode", val)}
                                length={10}
                                exactLength={10}
                                style={{ letterSpacing: "5px" }}
                                placeholder="- - - - - -"
                                tooltip={{
                                    text: "کد ملی و شماره همراه باید به نام یک نفر باشند",
                                    times: 2,
                                    showTime: 2500,
                                    className: "bg-yellow-300 p-1 text-gray-600 border border-yellow-500",
                                }}
                                ref={mcodeRef}
                            />
                            <div className="text-red-600 p-1 text-[60%]">
                                کد ملی و شماره همراه باید به نام یک نفر باشند
                            </div>
                        </div>

                        <div className="fji flex-col">
                            <Label>
                                ایمیل <span className="text-[70%]">(اختیاری)</span>
                            </Label>
                            <CharInput
                                value={formData.email}
                                onChange={(val) => handleChange("email", val)}
                                placeholder="Nima.Akbari@gmail.com"
                                length={30}
                                size={26}
                                required={false}
                                className="text-xs"
                            />
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div hidden={step !== 2} className="text-black space-y-2 fji flex-col">
                    <Header>عکس چهره</Header>
                    <div className="space-y-3">
                        <ImgInput
                            className="my-4"
                            id={"faceimg"}
                            size={200}
                            routeName="uploadmos"
                            dat={{ imgname: "faceimg" }}
                            onUploadProcess={(p) => setPercent(p)}
                            setLoading={setLoading}
                            setSelectedOrNot={setStep2Selected}
                        />
                        <Label className="w-full fji p-0 m-0">لطفا عکس چهره خود را ارسال کنید</Label>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="fji gap-4">
                    <button
                        onClick={() => handleStep("inc")}
                        disabled={step === maxStep || loading}
                        className={`px-6 py-2 mt-2 rounded text-white transition-colors duration-200
                                ${step === maxStep || loading
                                ? "bg-emerald-400 opacity-50 cursor-not-allowed"
                                : "bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                            }`}
                    >
                        {step === maxStep - 1 ? " پایان" : "مرحله بعد   "}
                    </button>

                    <button
                        onClick={() => handleStep("dec")}
                        className={`px-4 bg-blue-600 text-white py-2 mt-2 rounded hover:bg-blue-700 cursor-pointer ${step === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={step === 1}>
                        مرحله قبل
                    </button>
                </div>
            </div>}
            <UploadBar
                visible={percent > 0 && percent < 100}
                percent={percent}
                size={120}
                strokeWidth={5}
                label="بارگذاری"
                onClose={() => setPercent(0)}
            />
        </div>
    );
};

export default Body;
