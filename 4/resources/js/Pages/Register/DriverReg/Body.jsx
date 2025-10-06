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
        phone: "0987-654-3221",
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
    const [step3Selected, setStep3Selected] = useState(false);
    const [step4Selected, setStep4Selected] = useState(false);
    const [step5Selected, setStep5Selected] = useState(false);
    const [step6Selected, setStep6Selected] = useState(false);
    const [step7Selected, setStep7Selected] = useState(false);

    const maxStep = 8;

    const handleStep = async (action) => {
        if (action === "inc" && step < maxStep) {
            if (step === 1 && await validateStep1()) setStep(step + 1);
            else if (step === 2 && step2Selected) setStep(step + 1);
            else if (step === 2 && !step2Selected) ALRT_ERR("لطفا عکس چهره خود را ارسال کنید");
            else if (step === 3 && step3Selected) setStep(step + 1);
            else if (step === 3 && !step3Selected) ALRT_ERR("لطفا عکس روی گواهینامه خود را ارسال کنید");
            else if (step === 4 && step4Selected) setStep(step + 1);
            else if (step === 4 && !step4Selected) ALRT_ERR("لطفا عکس پشت گواهینامه خود را ارسال کنید");
            else if (step === 5 && step5Selected) setStep(step + 1);
            else if (step === 5 && !step5Selected) ALRT_ERR("لطفا عکس روی کارت ماشین خود را ارسال کنید");
            else if (step === 6 && step6Selected) setStep(step + 1);
            else if (step === 6 && !step6Selected) ALRT_ERR("لطفا عکس پشت کارت ماشین خود را ارسال کنید");
            else if (step === 7 && !step7Selected) ALRT_ERR("لطفا عکس بیمه نامه خود را ارسال کنید");
            else if (step === 7 && step7Selected) {

                setSeccessfull(true);
                //router.visit('/driver-dashboard'); // Example redirection
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
            const response = await axios.post("/driver-info", formData);
            progress.finish();
            setLoading(false);
            ALRT_OK("اطلاعات با موفقیت ثبت شد.");
            return true; // success
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
                    <span> نتیجه از طریق  پیامک برای شما ارسال می شود</span>
                </div>}
            {!successfull && <div className="w-fit h-full fji flex-col gap-3 text-sm bg-white bg-3d rounded-lg py-3 mx-2 px-6 text-xs">
                {/* Step 1 */}
                <div hidden={step !== 1} className="text-black space-y-2 fji flex-col">
                    <Header>ثبت نام راننده</Header>
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
                            routeName="upload"
                            dat={{ imgname: "faceimg" }}
                            onUploadProcess={(p) => setPercent(p)}
                            setLoading={setLoading}
                            setSelectedOrNot={setStep2Selected}
                        />
                        <Label className="w-full fji p-0 m-0">لطفا عکس چهره خود را ارسال کنید</Label>
                    </div>
                </div>

                {/* Step 3 */}
                <div hidden={step !== 3} className="text-black space-y-2 fji flex-col">
                    <Header>عکس گواهینامه - رو</Header>
                    <div className="space-y-3">
                        <ImgInput
                            className="my-4"
                            id={"liccard1"}
                            size={200}
                            routeName="upload"
                            dat={{ imgname: "liccard1" }}
                            onUploadProcess={(p) => setPercent(p)}
                            setLoading={setLoading}
                            setSelectedOrNot={setStep3Selected}
                        />
                        <Label className="w-full fji p-0 m-0">لطفا عکس روی گواهینامه خود را ارسال کنید</Label>
                    </div>
                </div>

                {/* Step 4 */}
                <div hidden={step !== 4} className="text-black space-y-2 fji flex-col">
                    <Header>عکس گواهینامه - پشت</Header>
                    <div className="space-y-3">
                        <ImgInput
                            className="my-4"
                            id={"liccard2"}
                            size={200}
                            routeName="upload"
                            dat={{ imgname: "liccard2" }}
                            onUploadProcess={(p) => setPercent(p)}
                            setLoading={setLoading}
                            setSelectedOrNot={setStep4Selected}
                        />
                        <Label className="w-full fji p-0 m-0">لطفا عکس پشت گواهینامه خود را ارسال کنید</Label>
                    </div>
                </div>

                {/* Step 5 */}
                <div hidden={step !== 5} className="text-black space-y-2 fji flex-col">
                    <Header>عکس کارت ماشین - رو</Header>
                    <div className="space-y-3">
                        <ImgInput
                            className="my-4"
                            id={"carcard1"}
                            size={200}
                            routeName="upload"
                            dat={{ imgname: "carcard1" }}
                            onUploadProcess={(p) => setPercent(p)}
                            setLoading={setLoading}
                            setSelectedOrNot={setStep5Selected}
                        />
                        <Label className="w-full fji p-0 m-0">لطفا عکس روی کارت ماشین خود را ارسال کنید</Label>
                    </div>
                </div>

                {/* Step 6 */}
                <div hidden={step !== 6} className="text-black space-y-2 fji flex-col">
                    <Header>عکس کارت ماشین - پشت</Header>
                    <div className="space-y-3">
                        <ImgInput
                            className="my-4"
                            id={"carcard2"}
                            size={200}
                            routeName="upload"
                            dat={{ imgname: "carcard2" }}
                            onUploadProcess={(p) => setPercent(p)}
                            setLoading={setLoading}
                            setSelectedOrNot={setStep6Selected}
                        />
                        <Label className="w-full fji p-0 m-0">لطفا عکس پشت کارت ماشین خود را ارسال کنید</Label>
                    </div>
                </div>

                {/* Step 7 */}
                <div hidden={step !== 7} className="text-black space-y-2 fji flex-col">
                    <Header>عکس بیمه نامه</Header>
                    <div className="space-y-3">
                        <ImgInput
                            className="my-4"
                            id={"Bimename"}
                            size={200}
                            routeName="upload"
                            dat={{ imgname: "Bimename" }}
                            onUploadProcess={(p) => setPercent(p)}
                            setLoading={setLoading}
                            setSelectedOrNot={setStep7Selected}
                        />
                        <Label className="w-full fji p-0 m-0">لطفا عکس بیمه نامه ماشین خود را ارسال کنید</Label>
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
