import React, { useState, useEffect, useRef, forwardRef, createContext, useContext, } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client"
import { ALRT_ERR } from "@/comcom/Alert";
import { usePage } from '@inertiajs/react'

import clsx from "clsx";
import { Loader } from "lucide-react";

export function CharInput({
    value = "",
    onChange = () => { },
    placeholder = "..",
    className = "",
    style = {},
    size = 12,
    minLength = 3,
    required = true,
    length = null, // max allowed chars
    disabled = false, // ✅ new
    tooltip = null,   // { text, times, showTime, className, style }
    ...rest
}) {
    const [touched, setTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipCount, setTooltipCount] = useState(0);
    const timerRef = useRef(null);

    const ALLOWED = "a-zA-Z\u0600-\u06FF\\s";
    const FILTER_RE = new RegExp(`[^${ALLOWED}]`, "g");
    const FULL_VALID_RE = new RegExp(`^[${ALLOWED}]+$`);

    useEffect(() => {
        const trimmed = value.trim();
        if (!required && trimmed.length === 0) setIsValid(true);
        else setIsValid(trimmed.length >= minLength && FULL_VALID_RE.test(trimmed));
    }, [value, minLength, required]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleBeforeInput = (e) => {
        if (isComposing || disabled) return;
        const inserted = e.nativeEvent?.data;
        if (!inserted) return;

        if (FILTER_RE.test(inserted)) {
            e.preventDefault();
            ALRT_ERR("فقط حروف فارسی و انگلیسی مجاز هستند!");
            return;
        }

        if (length && value.length >= length) {
            e.preventDefault();
            ALRT_ERR(`حداکثر طول مجاز ${length} کاراکتر است!`);
        }
    };

    const handlePaste = (e) => {
        if (disabled) return;
        e.preventDefault();
        const pasted = e.clipboardData.getData("text") || "";
        let filtered = pasted.replace(FILTER_RE, "");
        if (filtered !== pasted) {
            ALRT_ERR("متن چسبانده شده شامل کاراکترهای غیرمجاز بود و حذف شدند.");
        }

        const remaining = length ? Math.max(length - value.length, 0) : filtered.length;
        if (length && filtered.length > remaining) {
            filtered = filtered.slice(0, remaining);
            ALRT_ERR(`حداکثر طول مجاز ${length} کاراکتر است!`);
        }

        const input = e.target;
        const start = input.selectionStart ?? value.length;
        const end = input.selectionEnd ?? value.length;
        onChange(value.slice(0, start) + filtered + value.slice(end));
    };

    const handleChange = (e) => {
        if (disabled) return;
        let next = e.target.value;

        if (FILTER_RE.test(next)) {
            ALRT_ERR("فقط حروف فارسی و انگلیسی مجاز هستند!");
            next = next.replace(FILTER_RE, "");
        }

        if (length && next.length > length) {
            ALRT_ERR(`حداکثر طول مجاز ${length} کاراکتر است!`);
            next = next.slice(0, length);
        }

        onChange(next);
    };

    const handleFocus = () => {
        if (disabled) return;
        if (tooltip && tooltip.text) {
            const maxTimes = tooltip.times ?? 0;
            if (maxTimes === 0 || tooltipCount < maxTimes) {
                setTooltipCount((c) => c + 1);
                setShowTooltip(true);

                const duration = tooltip.showTime ?? 1200;
                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => setShowTooltip(false), duration);
            }
        }
    };

    const handleBlur = () => {
        setTouched(true);
        setShowTooltip(false);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    return (
        <div className="relative w-full">
            <input
                {...rest}
                type="text"
                disabled={disabled}
                size={size}
                value={value}
                onChange={handleChange}
                onBeforeInput={handleBeforeInput}
                onPaste={handlePaste}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={placeholder}
                className={clsx(
                    "w-full rounded border p-2 text-center outline-none transition-colors duration-200",
                    disabled
                        ? "bg-gray-100 text-gray-900 border-gray-300 cursor-not-allowed"
                        : touched
                            ? isValid
                                ? "border-green-500 focus:border-green-600"
                                : "border-red-500 focus:border-red-600"
                            : "border-gray-500 focus:border-blue-500",
                    className
                )}
                style={style}
            />

            {showTooltip && tooltip?.text && !disabled && (
                <div
                    className={clsx(
                        "absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 shadow-md whitespace-nowrap animate-fadeIn",
                        tooltip.className
                    )}
                    style={tooltip.style}
                >
                    {tooltip.text}
                </div>
            )}
        </div>
    );
}

export function Label({ children, className = "", style = {} }) {
    const baseClass = "text-blue-900 mb-1";
    const baseStyle = { textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" };

    return (
        <label className={`${baseClass} ${className}`} style={{ ...baseStyle, ...style }}>
            {children}
        </label>
    );
};

export function Header({ children, className = "", style = {} }) {
    const baseClass = "w-full text-xl border-b border-blue-900 pb-1 text-pink-500  text-center";
    const baseStyle = { fontFamily: "Nabi1", textShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)" };

    return (
        <label className={`${baseClass} ${className}`} style={{ ...baseStyle, ...style }}>
            {children}
        </label>
    );
};

export function NumInput({
    value = "",
    onChange = () => { },
    placeholder = "..",
    className = "",
    style = {},
    size = 12,
    minLength = 0,
    exactLength = null, // ✅ exact length requirement
    required = true,
    length = null, // max length
    disabled = false,
    tooltip = null,
    ...rest
}) {
    const ALLOWED = "0-9";
    const FILTER_RE = new RegExp(`[^${ALLOWED}]`, "g");
    const FULL_VALID_RE = new RegExp(`^[${ALLOWED}]+$`);
    const [touched, setTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipCount, setTooltipCount] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        const trimmed = value.trim();
        let valid = FULL_VALID_RE.test(trimmed);
        if (required && trimmed.length === 0) valid = false;
        if (minLength && trimmed.length < minLength) valid = false;
        if (exactLength && trimmed.length !== exactLength) valid = false;
        setIsValid(valid);
    }, [value, minLength, exactLength, required]);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleBeforeInput = (e) => {
        if (isComposing || disabled) return;
        const inserted = e.nativeEvent?.data;
        if (!inserted) return;

        if (FILTER_RE.test(inserted)) {
            e.preventDefault();
            ALRT_ERR("فقط اعداد مجاز هستند!");
            return;
        }

        if (length && value.length >= length) {
            e.preventDefault();
            ALRT_ERR(`حداکثر طول مجاز ${length} رقم است!`);
        }
    };

    const handlePaste = (e) => {
        if (disabled) return;
        e.preventDefault();
        const pasted = e.clipboardData.getData("text") || "";
        let filtered = pasted.replace(FILTER_RE, "");
        if (filtered !== pasted) {
            ALRT_ERR("متن چسبانده شده شامل کاراکترهای غیرمجاز بود و حذف شدند.");
        }

        const remaining = length ? Math.max(length - value.length, 0) : filtered.length;
        if (length && filtered.length > remaining) {
            filtered = filtered.slice(0, remaining);
            ALRT_ERR(`حداکثر طول مجاز ${length} رقم است!`);
        }

        const input = e.target;
        const start = input.selectionStart ?? value.length;
        const end = input.selectionEnd ?? value.length;
        onChange(value.slice(0, start) + filtered + value.slice(end));
    };

    const handleChange = (e) => {
        if (disabled) return;
        let next = e.target.value;

        if (FILTER_RE.test(next)) {
            ALRT_ERR("فقط اعداد مجاز هستند!");
            next = next.replace(FILTER_RE, "");
        }

        if (length && next.length > length) {
            ALRT_ERR(`حداکثر طول مجاز ${length} رقم است!`);
            next = next.slice(0, length);
        }

        onChange(next);
    };

    const handleFocus = () => {
        if (disabled) return;
        if (tooltip && tooltip.text) {
            const maxTimes = tooltip.times ?? 0;
            if (maxTimes === 0 || tooltipCount < maxTimes) {
                setTooltipCount((c) => c + 1);
                setShowTooltip(true);

                const duration = tooltip.showTime ?? 1200;
                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => setShowTooltip(false), duration);
            }
        }
    };

    const handleBlur = () => {
        setTouched(true);
        setShowTooltip(false);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    return (
        <div className="relative w-full">
            <input
                {...rest}
                type="text"
                disabled={disabled}
                size={size}
                value={value}
                onChange={handleChange}
                onBeforeInput={handleBeforeInput}
                onPaste={handlePaste}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onBlur={handleBlur}
                onFocus={handleFocus}
                placeholder={placeholder}
                className={clsx(
                    "w-full rounded border p-2 text-center outline-none transition-colors duration-200",
                    disabled
                        ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                        : touched
                            ? isValid
                                ? "border-green-500 focus:border-green-600"
                                : "border-red-500 focus:border-red-600"
                            : "border-gray-500 focus:border-blue-500",
                    className
                )}
                style={{ direction: "ltr", ...style }}
            />

            {showTooltip && tooltip?.text && !disabled && (
                <div
                    className={clsx(
                        "absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-xs rounded px-2 py-1 shadow-md whitespace-nowrap animate-fadeIn",
                        tooltip.className
                    )}
                    style={tooltip.style}
                >
                    {tooltip.text}
                </div>
            )}
        </div>
    );
}

export function Clock({ className = "", style = {} }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        let h = date.toLocaleTimeString("fa-IR", {
            hour: "2-digit",
            hour12: false,
            timeZone: "Asia/Tehran",
        });
        let m = date.toLocaleTimeString("fa-IR", {
            minute: "2-digit",
            hour12: false,
            timeZone: "Asia/Tehran",
        });
        let s = date.toLocaleTimeString("fa-IR", {
            second: "2-digit",
            hour12: false,
            timeZone: "Asia/Tehran",
        });
        return <div className="fji gap-1" style={{ direction: "ltr" }}>
            <span>{h}</span>
            :
            <span>{m}</span>
            :
            <span>{s}</span>
        </div>
    };
    return (
        <div className={`min-w-[100px] flex items-center justify-center ${className}`}>
            {formatTime(time)}
        </div>
    );
};

export function Loadw({ size = 17, color = "white", className = "" }) {
    return <Loader size={size} className={"animate-spin " + className} color={color} />
}

export function LogoutBtn() {
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            await axios.post("/logout");
            window.location.reload();
            setLoading(false);
        } catch (err) {
            console.error("Logout failed:", err);
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="cursor-pointer bg-orange-500 text-white text-sm rounded-sm px-3 py-1 hover:bg-red-700"
            disabled={loading}
        >
            {loading ? <Loadw /> : "خروج"}
        </button>
    );
}

export function scrollAndShine() {
    const el = document.getElementById("search-box");
    if (!el) return;

    el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
    });

    el.classList.add("shine-effect");

    setTimeout(() => {
        el.classList.remove("shine-effect");
    }, 1500);
};

export const Button = forwardRef(function Button(
    {
        variant = "solid",
        className = "",
        style,
        children,
        ...props
    },
    ref
) {
    const variantMap = {
        solid:
            "hover:brightness-90 mt-1",
        classic:
            " hover:brightness-80 transition-all duration-100 shadow-[inset_0_2px_3px_rgba(255,255,255,0.9)] active:shadow-[inset_0_4px_6px_rgba(0,0,0,0.5)]",
    };

    const variantClasses = variantMap[variant];

    return (
        <div className="fji p-1">
            <div className={"fji " + (variant == "classic" ? "pt-1 active:pt-0" : "")}>
                <button
                    ref={ref}
                    style={style}
                    className={clsx(
                        "fji p-1.5 cursor-pointer border shadow-500/100 text-white rounded-md text-sm gap-2",
                        variantClasses,
                        className
                    )}
                    {...props}
                >
                    {children}
                </button>
            </div>
        </div>
    );
});


////////////////////////////////////////////////////////////

export function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return null;
}

export function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


////////////////////////////////////////////////////////////

