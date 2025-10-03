import React, { useEffect, useRef, useState, useContext } from "react";
import { SquareX } from "lucide-react";

export default function Modal({ open, closeOnClickOutside = false, onClose, children, title, z = 50 }) {
    const modalRef = useRef();
    const [borderError, setBorderError] = useState(false);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => (document.body.style.overflow = "");
    }, [open]);

    if (!open) return null;

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            if (closeOnClickOutside) {
                onClose();
            } else {
                setBorderError(true);
                setTimeout(() => setBorderError(false), 250);
            }
        }
    };

    return (
        <div onMouseDown={handleClickOutside}
            className={`fixed inset-0 z-${z} flex items-center justify-center bg-[rgba(0,0,0,0.2)] backdrop-blur-xs`}
            role="dialog" aria-modal="true"
        >
            <div ref={modalRef} onMouseDown={(e) => e.stopPropagation()}
                className={`bg-white rounded-lg shadow-lg p-3 pb-2 w-fit max-w-[95%]  relative transition-all duration-300 ${borderError ? "border-4 border-red-500" : ""}`}
            >
                <div className="flex flex-row justify-between">
                    <div>{title}</div>
                    <SquareX onClick={onClose} />
                </div>
                <div className="w-full my-1 h-[1px] bg-gray-200"></div>
                {children}
            </div>
        </div>
    );
}
